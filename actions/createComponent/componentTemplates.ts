export const getComponentIndexTemplate = (pascalName: string, camelName: string): string => {
  return `export * from "./${camelName}.component";`;
};

export const getComponentStyleTemplate = (pascalName: string, camelName: string): string => {
  return `.${camelName} {}`;
};

export const getComponentTemplate = (pascalName: string, camelName: string): string => {
  return `import { FC, PropsWithChildren } from "react";

import styles from "./${camelName}.styles.module.scss";

type ${pascalName}Props = {
  // ...
};

const ${pascalName}Component: FC<PropsWithChildren<${pascalName}Props>> = () => {
  return <div className={styles.${camelName}}></div>;
};
${pascalName}Component.displayName = "${pascalName}";

export const ${pascalName} = ${pascalName}Component;
`;
};
