import { describe, expect, test } from "bun:test"
import {
  isSolFableClaudeVersion,
  isSolFableCodexVersion,
  normalizeSolFableClaudeVersion,
  solFableCodexVersion,
} from "../src/release/sol-fable-fork"

describe("Sol/Fable fork versions", () => {
  test("accepts positive packaging revisions derived from the upstream base", () => {
    expect(isSolFableClaudeVersion("3.21.0", "3.21.0-sol-fable.1")).toBe(true)
    expect(isSolFableClaudeVersion("3.21.0", "3.21.0-sol-fable.12")).toBe(true)
    expect(isSolFableClaudeVersion("3.21.0", "3.20.0-sol-fable.12")).toBe(false)
    expect(isSolFableClaudeVersion("3.21.0", "3.21.0-sol-fable.0")).toBe(false)
  })

  test("carries a valid packaging revision to a new upstream base", () => {
    expect(normalizeSolFableClaudeVersion("3.22.0", "3.21.0-sol-fable.4")).toBe(
      "3.22.0-sol-fable.4",
    )
    expect(normalizeSolFableClaudeVersion("3.22.0", "invalid")).toBe("3.22.0-sol-fable.1")
  })

  test("binds the Codex build stamp to the complete Claude fork version", () => {
    expect(
      isSolFableCodexVersion(
        "3.21.0-sol-fable.2",
        "3.21.0-sol-fable.2+codex.20260803163000",
      ),
    ).toBe(true)
    expect(
      isSolFableCodexVersion(
        "3.21.0-sol-fable.2",
        "3.21.0-sol-fable.1+codex.20260803163000",
      ),
    ).toBe(false)
  })

  test("generates a UTC Codex build stamp for a derived Claude version", () => {
    expect(
      solFableCodexVersion("3.22.0-sol-fable.4", new Date("2026-08-03T18:45:06Z")),
    ).toBe("3.22.0-sol-fable.4+codex.20260803184506")
  })
})
