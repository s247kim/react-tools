import chalk from "chalk";
import * as fs from "fs/promises";
import * as path from "path";

import { printError, printInfo, printSuccess } from "../../utils/message.utils";
import { strToCamelCase, strToPascalCase } from "../../utils/string.utils";
import {
  getContextIndexTemplate,
  getContextProviderTemplate,
  getContextReducerTemplate,
  getContextTypeTemplate
} from "./contextTemplates";

export const createContext = async (contextName: string): Promise<void> => {
  const pascalName = strToPascalCase(contextName);
  const camelName = strToCamelCase(contextName);

  printInfo(`Creating React Context ${chalk.yellow(pascalName)}`);

  const contextDir = path.resolve(process.cwd(), "src/contexts", camelName);
  try {
    const files = await fs.readdir(contextDir);
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

  await fs.mkdir(contextDir, { recursive: true });
  printInfo(`Directory Created ${chalk.yellow(contextDir)}`);

  const providerContent = getContextProviderTemplate(pascalName, camelName);
  const providerFileName = `${camelName}.provider.tsx`;
  await fs.writeFile(path.resolve(contextDir, providerFileName), providerContent);
  printInfo(`Provider Created ${chalk.yellow(providerFileName)}`);

  const reducerContent = getContextReducerTemplate(pascalName, camelName);
  const reducerFileName = `${camelName}.reducer.ts`;
  await fs.writeFile(path.resolve(contextDir, reducerFileName), reducerContent);
  printInfo(`Reducer Created ${chalk.yellow(reducerFileName)}`);

  const typeContent = getContextTypeTemplate(pascalName, camelName);
  const typeFileName = `${camelName}.types.ts`;
  await fs.writeFile(path.resolve(contextDir, typeFileName), typeContent);
  printInfo(`Type Created ${chalk.yellow(typeFileName)}`);

  const indexContent = getContextIndexTemplate(pascalName, camelName);
  const indexFileName = `index.ts`;
  await fs.writeFile(path.resolve(contextDir, indexFileName), indexContent);
  printInfo(`Index Created ${chalk.yellow(indexFileName)}`);

  printSuccess(`Created React Context ${chalk.yellow(pascalName)}`);
};
