export const getContextIndexTemplate = (pascalName: string, camelName: string): string => {
  return `export * from "./${camelName}.provider";
export type { ${pascalName}Store } from "./${camelName}.types";`;
};

export const getContextTypeTemplate = (pascalName: string, camelName: string): string => {
  return `export type ${pascalName}Store = {};

export type ${pascalName}Action =
  | { "clearStore" }
  | { "setStore": Partial<${pascalName}Store> }

export const init${pascalName}Store = (): ${pascalName}Store => {
  return {};
};`;
};

export const getContextReducerTemplate = (pascalName: string, camelName: string): string => {
  return `import { ${pascalName}Action, ${pascalName}Store } from "./${camelName}.types";

type ${pascalName}Reducer = (state: ${pascalName}Store, action: ${pascalName}Action) => ${pascalName}Store;

export const ${camelName}Reducer: ${pascalName}Reducer = (state, action) => {
  switch (action.type) {
    case "clearStore": {
      return {};
    }
    case "setData": {
      return { ...state, ...action.value };
    }
    default: {
      throw new Error(
        // @ts-ignore
        \`\${action.type} is not a valid action for the todoManage context\`
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
    throw new Error("useAction must be used within a ${pascalName}Provider");
  }
  return context;
}

export const use${pascalName}Store = (): ${pascalName}Store => {
  const context = useContext(${pascalName}StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a ${pascalName}Provider");
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

