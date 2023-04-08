export const getHookTemplate = (pascalName: string, camelName: string, isContext: boolean): string => {
  if (isContext) {
    return `import { use${pascalName}Action, use${pascalName}Store } from "../../contexts/${camelName}/${camelName}.provider";

export const use${pascalName} = (): void => {
  const store = use${pascalName}Store();
  const action = use${pascalName}Action();
};`;
  }

  return `export const use${pascalName} = (): void => {
};`;
};

export const getHookTestTemplate = (pascalName: string, camelName: string, isContext: boolean): string => {
  if (isContext) {
    return `import { FC, PropsWithChildren } from "react";
import { cleanup, renderHook } from "@testing-library/react";

import { ${pascalName}Provider } from "../../contexts/${camelName}/${camelName}.provider";
import { use${pascalName} } from "./use${pascalName}";

describe("use${pascalName}", () => {
  const wrapper: FC<PropsWithChildren> = ({ children }) => {
    return <${pascalName}Provider>{children}</${pascalName}Provider>;
  };

  afterEach(() => {
    cleanup();
  });
  
  it("sample", async () => {
    const { result } = renderHook(() => use${pascalName}(), { wrapper });
  });
  
  it("throws error when use${pascalName} is not within a ${pascalName}Provider", async () => {
    console.error = jest.fn();
    expect(() => renderHook(() => use${pascalName}())).toThrowError(/must be used within/);
  });
});`;
  }


  return `import { cleanup, renderHook } from "@testing-library/react";

import { use${pascalName} } from "./use${pascalName}";

describe("use${pascalName}", () => {
  afterEach(() => {
    cleanup();
  });
  
  it("sample", async () => {
    const { result } = renderHook(() => use${pascalName}());
  });
});`;
};