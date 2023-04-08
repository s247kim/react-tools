import chalk from "chalk";
import path from "path";
import fs from "fs/promises";

import { strToCamelCase, strToPascalCase } from "../../utils/string.utils";
import { printError, printInfo, printSuccess } from "../../utils/message.utils";
import { getHookTemplate, getHookTestTemplate } from "./hookTemplates";

export const createHook = async (hookName: string, isContext: boolean): Promise<void> => {
  const pascalName = strToPascalCase(hookName);
  const camelName = strToCamelCase(hookName);

  printInfo(`Creating React Hook ${chalk.yellow(`use${pascalName}`)}`);

  const hookDir = path.resolve(process.cwd(), "src/hooks", `use${pascalName}`);
  try {
    const files = await fs.readdir(hookDir);
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

  await fs.mkdir(hookDir, {recursive: true});
  printInfo(`Directory Created ${chalk.yellow(hookDir)}`);

  const hookContent = getHookTemplate(pascalName, camelName, isContext);
  const hookFileName = `use${pascalName}.tsx`;
  await fs.writeFile(path.resolve(hookDir, hookFileName), hookContent);
  printInfo(`Hook Created ${chalk.yellow(hookFileName)}`);

  const testContent = getHookTestTemplate(pascalName, camelName, isContext);
  const testFileName = `use${pascalName}.spec.tsx`;
  await fs.writeFile(path.resolve(hookDir, testFileName), testContent);
  printInfo(`Test Created ${chalk.yellow(testFileName)}`);

  printSuccess(`Created React Hook ${chalk.yellow(`use${pascalName}`)}`);
};