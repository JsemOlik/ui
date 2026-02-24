#!/usr/bin/env bun

import { addCommand } from "./commands/add"

const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case "add":
    await addCommand(args.slice(1))
    break
  default:
    console.log("jsemolik-ui")
    console.log("")
    console.log("Usage:")
    console.log("  jsemolik-ui add <component>")
}