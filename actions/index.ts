import { createComponent } from "./createComponent/createComponent";
import { createContext } from "./createContext/createContext";

export const generateComponentAction = (componentName: string, options: {
  shared?: boolean,
  dir?: string,
  emotion?: boolean
}) => {
  createComponent(componentName, options.shared || false, options.emotion || false, options.dir);
};

export const generateContextAction = (contextName: string, options: { hook?: boolean }) => {
  createContext(contextName, options.hook || false);
};