#! /usr/bin/env node

import { program } from "commander";
import { createAction } from "./actions";

program.command("create")
  .description("Create React Template")
  .option('-c, --component <name>', 'React')
  .action(createAction);

program.parse();