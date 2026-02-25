import { copyComponent } from "../utils/fs.js";

export async function addCommand(names: string[]) {
  if (!names.length) {
    console.log("Please specify component names");
    return;
  }

  for (const name of names) {
    const path = copyComponent(name);
    console.log(`Added ${name} → ${path}`);
  }
}
