import chalk from "chalk";
import { createReactComponent } from "./createComponent/createReactComponent";

export const createAction = (options: { component?: string }) => {
  for (const [key, value] of Object.entries(options)) {
    switch (key) {
      case "component": {
        createReactComponent(value);
        break;
      }
      default: {
        console.log(chalk.red.bold(`${key} is not a valid option`));
        throw new Error(`${key} is not a valid option`);
      }
    }
  }
};
