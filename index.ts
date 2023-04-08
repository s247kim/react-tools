#! /usr/bin/env node

import { program } from "commander";
import { generateComponentAction, generateContextAction } from "./actions";

program.command("gen-comp")
  .description("Generate React Component from Template")
  .argument("<componentName>")
  .option("-s, --shared", "Make a shared component")
  .option("-d, --dir <dirName>", "Directory for the generated component")
  .option("-e, --emotion", "Emotion CSS instead of SCSS")
  .action(generateComponentAction);

program.command("gen-context")
  .description("Generate React Context from Template")
  .argument("<contextName>")
  .option("-h, --hook", "Make a hook for the context")
  .action(generateContextAction);

program.parse();