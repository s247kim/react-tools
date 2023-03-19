import chalk from "chalk";
import * as fs from "fs/promises";
import * as path from "path";

import { printError, printInfo, printSuccess } from "../../utils/message.utils";
import { strToCamelCase, strToPascalCase } from "../../utils/string.utils";
import { getComponentIndexTemplate, getComponentStyleTemplate, getComponentTemplate } from "./componentTemplates";

export const createComponent = async (
  componentName: string,
  isShared: boolean
): Promise<void> => {
  const pascalName = strToPascalCase(componentName);
  const camelName = strToCamelCase(componentName);

  printInfo(`Creating React Component ${chalk.yellow(pascalName)}`);

  const componentsDir = path.resolve(process.cwd(), "src/components", isShared ? "shared" : "", camelName);
  try {
    const files = await fs.readdir(componentsDir);
    printInfo(`Directory already has ${files.length} files`);
    printError(`Aborting`);
    return;
  } catch (err: any) {
    if ("code" in err && err.code === "ENOENT") {
      // pass
    } else {
      printError(`Unknown Exception`);
      printError(err);
    }
  }

  await fs.mkdir(componentsDir, { recursive: true });
  printInfo(`Directory Created ${chalk.yellow(componentsDir)}`);

  const componentContent = getComponentTemplate(pascalName, camelName);
  const componentFileName = `${camelName}.component.tsx`;
  await fs.writeFile(path.resolve(componentsDir, componentFileName), componentContent);
  printInfo(`Component Created ${chalk.yellow(componentFileName)}`);

  const styleContent = getComponentStyleTemplate(pascalName, camelName);
  const styleFileName = `${camelName}.styles.module.scss`;
  await fs.writeFile(path.resolve(componentsDir, styleFileName), styleContent);
  printInfo(`Style Created ${chalk.yellow(styleFileName)}`);

  const indexContent = getComponentIndexTemplate(pascalName, camelName);
  const indexFileName = `index.ts`;
  await fs.writeFile(path.resolve(componentsDir, indexFileName), indexContent);
  printInfo(`Index Created ${chalk.yellow(indexFileName)}`);

  printSuccess(`Created React Component ${chalk.yellow(pascalName)}`);
};
