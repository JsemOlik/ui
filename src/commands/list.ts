import { listRegistryComponents } from "../utils/fs.js";

export async function listCommand() {
  const components = listRegistryComponents();

  if (!components.length) {
    console.log("No components available");
    return;
  }

  console.log("Available components:\n");

  for (const c of components) {
    console.log(`  • ${c}`);
  }

  console.log(`\nTotal: ${components.length}`);
}
