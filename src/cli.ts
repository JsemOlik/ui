#!/usr/bin/env node

import { addCommand } from "./commands/add";
import { listCommand } from "./commands/list";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    await addCommand(args.slice(1));
    break;

  case "list":
    await listCommand();
    break;

  default:
    console.log("jsemolik-ui");
    console.log("");
    console.log("Usage:");
    console.log("  jsemolik-ui add <component>");
    console.log("  jsemolik-ui list");
}
