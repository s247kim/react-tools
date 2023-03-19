import chalk from "chalk";

export const printInfo = (message: string): void => {
  console.log(`${chalk.bold.blue("[INFO]")}: ${message}`);
};

export const printWarn = (message: string): void => {
  console.log(`${chalk.bold.yellow("[WARN]")}: ${message}`);
};

export const printError = (message: string): void => {
  console.log(`${chalk.bold.red("[ERROR]")}: ${message}`);
};

export const printSuccess = (message: string): void => {
  console.log(`${chalk.bold.green("[DONE]")}: ${message}`);
};