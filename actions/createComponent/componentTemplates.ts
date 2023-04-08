export const getComponentStyleTemplate = (pascalName: string, camelName: string, isEmotion: boolean): string => {
  if (isEmotion) {
    return `import { css } from "@emotion/react";

export default css\`

\`;`;
  }

  return `.${camelName} {}`;
};

export const getComponentTemplate = (pascalName: string, camelName: string, isEmotion: boolean): string => {
  if (isEmotion) {
    return `/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { FC, PropsWithChildren } from "react";

import styles from "./${camelName}.styles";

type ${pascalName}Props = {
  // ...
};

const ${pascalName}Component: FC<PropsWithChildren<${pascalName}Props>> = () => {
  return <div css={styles}></div>;
};
${pascalName}Component.displayName = "${pascalName}";

export const ${pascalName} = ${pascalName}Component;`;
  }

  return `import { FC, PropsWithChildren } from "react";

import styles from "./${camelName}.styles.module.scss";

type ${pascalName}Props = {
  // ...
};

const ${pascalName}Component: FC<PropsWithChildren<${pascalName}Props>> = () => {
  return <div className={styles.${camelName}}></div>;
};
${pascalName}Component.displayName = "${pascalName}";

export const ${pascalName} = ${pascalName}Component;`;

};

export const getComponentTestTemplate = (pascalName: string, camelName: string): string => {
  return `import { cleanup, render } from "@testing-library/react";

import { ${pascalName} } from "./${camelName}.component";

describe("<${pascalName} />", () => {
  afterEach(cleanup);

  it("renders without crashing", async () => {
    const { container } = render(<${pascalName} />);

    expect(container).toMatchSnapshot();
  });
});`;
};