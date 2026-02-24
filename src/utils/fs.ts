import { existsSync, mkdirSync, copyFileSync } from "fs"
import { join } from "path"

/**
 * Absolute path to this CLI package root
 */
export function getCliRoot() {
  return join(import.meta.dir, "..", "..")
}

/**
 * Path to bundled components in this repo
 */
export function getRegistryComponentsDir() {
  return join(getCliRoot(), "components")
}

/**
 * Path to user's project components dir
 */
export function getProjectComponentsDir() {
  return join(process.cwd(), "components")
}

/**
 * Ensure project components directory exists
 */
export function ensureProjectComponentsDir() {
  const dir = getProjectComponentsDir()
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }
}

/**
 * Resolve registry component file
 */
export function resolveRegistryComponent(name: string) {
  return join(getRegistryComponentsDir(), `${name}.tsx`)
}

/**
 * Resolve target project component file
 */
export function resolveProjectComponent(name: string) {
  return join(getProjectComponentsDir(), `${name}.tsx`)
}

/**
 * Copy component from registry → project
 */
export function copyComponent(name: string) {
  const src = resolveRegistryComponent(name)
  const dst = resolveProjectComponent(name)

  if (!existsSync(src)) {
    throw new Error(`Component "${name}" not found in registry.`)
  }

  ensureProjectComponentsDir()
  copyFileSync(src, dst)

  return dst
}