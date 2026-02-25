#!/usr/bin/env node

import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";

const args = process.argv.slice(2);

const command = args[0];

if (command === "add") {
  await addCommand(args.slice(1));
} else if (command === "list") {
  await listCommand();
} else {
  console.log("Unknown command");
}
