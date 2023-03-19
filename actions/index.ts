import { createComponent } from "./createComponent/createComponent";
import { createContext } from "./createContext/createContext";

export const generateComponentAction = (componentName: string, options: { shared?: boolean }) => {
  createComponent(componentName, options.shared || false);
};

export const generateContextAction = (contextName: string) => {
  createContext(contextName);
};