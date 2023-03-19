import { createComponent } from "./createComponent/createComponent";
import { createContext } from "./createContext/createContext";

export const generateComponentAction = (componentName: string, options: { shared?: boolean, dir?: string }) => {
  createComponent(componentName, options.shared || false, options.dir);
};

export const generateContextAction = (contextName: string) => {
  createContext(contextName);
};