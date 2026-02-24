import { copyComponent } from "../utils/fs"

export async function addCommand(args: string[]) {
  const name = args[0]

  if (!name) {
    console.error("Please specify a component name.")
    process.exit(1)
  }

  try {
    const path = copyComponent(name)
    console.log(`✔ Added ${name} → ${path}`)
  } catch (err: any) {
    console.error(err.message)
    process.exit(1)
  }
}