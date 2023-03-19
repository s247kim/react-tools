export const getComponentTemplate = (
  pascalName: string,
  camelName: string
): string => {
  return `import { FC, PropsWithChildren } from "react";

import styles from "./${camelName}.styles.module.scss";

type ${pascalName}Props = {
  // ...
};

export const ${pascalName}: FC<PropsWithChildren<${pascalName}Props>> = () => {
  
  return <div className={styles.${camelName}}></div>;
};

${pascalName}.displayName = "${pascalName}";`;
};

export const getStyleTemplate = (camelName: string): string => {
  return `.${camelName} {}`;
};

export const getIndexTemplate = (camelName: string): string => {
  return `export * from "./${camelName}.component";`;
};
