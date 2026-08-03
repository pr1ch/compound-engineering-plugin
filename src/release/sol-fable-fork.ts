export const SOL_FABLE_PLUGIN_NAME = "compound-engineering-sol-fable"

const SOL_FABLE_CODEX_BUILD = /^\d{14}$/
const SOL_FABLE_VERSION = /^(\d+\.\d+\.\d+)-sol-fable\.([1-9]\d*)$/

export function isSolFablePlugin(name: string | undefined): boolean {
  return name === SOL_FABLE_PLUGIN_NAME
}

export function solFableClaudeVersion(baseVersion: string, revision = 1): string {
  return `${baseVersion}-sol-fable.${revision}`
}

export function isSolFableClaudeVersion(baseVersion: string, version: string): boolean {
  return SOL_FABLE_VERSION.exec(version)?.[1] === baseVersion
}

export function normalizeSolFableClaudeVersion(baseVersion: string, version: string): string {
  const revision = SOL_FABLE_VERSION.exec(version)?.[2]
  return solFableClaudeVersion(baseVersion, revision ? Number(revision) : 1)
}

export function isSolFableCodexVersion(claudeVersion: string, version: string): boolean {
  const prefix = `${claudeVersion}+codex.`
  return version.startsWith(prefix) && SOL_FABLE_CODEX_BUILD.test(version.slice(prefix.length))
}

export function solFableCodexVersion(claudeVersion: string, now = new Date()): string {
  const build = now.toISOString().replace(/\D/g, "").slice(0, 14)
  return `${claudeVersion}+codex.${build}`
}
