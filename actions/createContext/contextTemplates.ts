export const getContextTypeTemplate = (pascalName: string, camelName: string): string => {
  return `export type ${pascalName}Store = {
  sample: string;  
};

export type ${pascalName}Action =
  | { type: "clearStore" }
  | { type: "setStore"; value: { str: string } };

export const init${pascalName}Store = (): ${pascalName}Store => {
  return { sample: 'sample'};
};`;
};

export const getContextReducerTemplate = (pascalName: string, camelName: string): string => {
  return `import { ${pascalName}Action, ${pascalName}Store } from "./${camelName}.types";

type ${pascalName}Reducer = (state: ${pascalName}Store, action: ${pascalName}Action) => ${pascalName}Store;

export const ${camelName}Reducer: ${pascalName}Reducer = (state, action) => {
  switch (action.type) {
    case "clearStore": {
      return { sample: "" };
    }
    case "setStore": {
      const { str } = action.value;
      return { sample: str };
    }
    default: {
      throw new Error(
        // @ts-ignore
        \`\${action.type} is not a valid action for the ${camelName} context\`
      );
    }
  }

  return state; // return state without changing to prevent re-rendering
};`;
};

export const getContextProviderTemplate = (pascalName: string, camelName: string): string => {
  return `import { createContext, Dispatch, FC, PropsWithChildren, useContext, useReducer } from "react";

import { init${pascalName}Store, ${pascalName}Action, ${pascalName}Store } from "./${camelName}.types";
import { ${camelName}Reducer } from "./${camelName}.reducer";

const ${pascalName}ActionContext = createContext<Dispatch<${pascalName}Action> | undefined>(undefined);
${pascalName}ActionContext.displayName = "${pascalName}ActionContext";
const ${pascalName}StoreContext = createContext<${pascalName}Store | undefined>(undefined);
${pascalName}StoreContext.displayName = "${pascalName}StoreContext";

export const use${pascalName}Action = (): Dispatch<${pascalName}Action> => {
  const context = useContext(${pascalName}ActionContext);
  if (!context) {
    throw new Error("use${pascalName}Action must be used within a ${pascalName}Provider");
  }
  return context;
}

export const use${pascalName}Store = (): ${pascalName}Store => {
  const context = useContext(${pascalName}StoreContext);
  if (!context) {
    throw new Error("use${pascalName}Store must be used within a ${pascalName}Provider");
  }
  return context;
};

export const ${pascalName}Provider: FC<PropsWithChildren> = ({ children }) => {
  const [state, action] = useReducer(${camelName}Reducer, null, init${pascalName}Store);

  return (
    <${pascalName}ActionContext.Provider value={action}>
      <${pascalName}StoreContext.Provider value={state}>
        {children}
      </${pascalName}StoreContext.Provider>
    </${pascalName}ActionContext.Provider>
  );
};
${pascalName}Provider.displayName = "${pascalName}Provider";`;
};

export const getContextTestTemplate = (pascalName: string, camelName: string): string => {
  return `import { renderHook } from "@testing-library/react";

import { ${pascalName}Store } from "./${camelName}.types";
import { ${camelName}Reducer } from "./${camelName}.reducer";
import { use${pascalName}Action, use${pascalName}Store } from "./${camelName}.provider";

describe("${camelName}Context", () => {
  it("sets sample", async () => {
    const state: ${pascalName}Store = { sample: "" };
    const sampleSetState = ${camelName}Reducer(state, {
      type: "setStore",
      value: { str: "test" }
    });
    
    // immutability check: previous state must not be modified
    expect(state).toEqual({ sample: "" });
    expect(sampleSetState).toEqual({ sample: "test" });
  });
  
  it("clears sample", async () => {
    const state: ${pascalName}Store = { sample: "test" };
    const sampleClearState = ${camelName}Reducer(state, { type: "clearStore" });
    
    // immutability check: previous state must not be modified
    expect(state).toEqual({ sample: "test" });
    expect(sampleClearState).toEqual({ sample: "" });
  });

  it("throws error when action type is not supported", async () => {
    const state: ${pascalName}Store = { sample: "test" };

    // @ts-ignore
    expect(() => ${camelName}Reducer(state, { type: "invalid action" })).toThrowError(
      "invalid action is not a valid action for the ${camelName} context"
    );
  });

  it("throws error when use${pascalName}Action is not within the ${pascalName}Provider", async () => {
    console.error = jest.fn();
    expect(() => renderHook(() => use${pascalName}Action())).toThrowError(/must be used within/);
  });

  it("throws error when use${pascalName}Store is not within the ${pascalName}Provider", async () => {
    console.error = jest.fn();
    expect(() => renderHook(() => use${pascalName}Store())).toThrowError(/must be used within/);
  });
});`;
};

