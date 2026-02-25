import { listRegistryComponents } from "../utils/fs";

export async function listCommand() {
  const components = listRegistryComponents();

  if (components.length === 0) {
    console.log("No components available.");
    return;
  }

  console.log("Available components:\n");

  for (const name of components) {
    console.log(`  • ${name}`);
  }

  console.log("");
  console.log(`Total: ${components.length}`);
}
