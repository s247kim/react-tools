import chalk from "chalk";
import path from "path";
import fs from "fs/promises";

import { printError, printInfo, printSuccess } from "../../utils/message.utils";
import { strToCamelCase, strToPascalCase } from "../../utils/string.utils";
import {
  getContextProviderTemplate,
  getContextReducerTemplate,
  getContextTestTemplate,
  getContextTypeTemplate
} from "./contextTemplates";
import { createHook } from "../createHook/createHook";

export const createContext = async (contextName: string, makeHook: boolean): Promise<void> => {
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

  await fs.mkdir(contextDir, {recursive: true});
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

  const testContent = getContextTestTemplate(pascalName, camelName);
  const testFileName = `${camelName}.spec.ts`;
  await fs.writeFile(path.resolve(contextDir, testFileName), testContent);
  printInfo(`Test Created ${chalk.yellow(testFileName)}`);

  printSuccess(`Created React Context ${chalk.yellow(pascalName)}`);

  if (makeHook) {
    await createHook(contextName, true);
  }
};
