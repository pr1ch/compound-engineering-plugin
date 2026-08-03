# Compound Engineering — Sol/Fable local fork

Upstream base: Compound Engineering 3.21.0 at commit
`4a47a2e0ae06aec412b8b242f3fc4d7ace9bf7da`.

Local cross-model review policy:

- Claude-hosted reviews call Codex with `gpt-5.6-sol` and
  `model_reasoning_effort="high"`.
- Codex-hosted reviews call Claude with `--model fable --effort max`.
- `ce-code-review`, `ce-doc-review`, and cross-model `ce-pov` use the same
  Codex/Claude mapping.
- The Claude model receipt matcher recognizes the `claude-fable-*` served-model
  family so the review artifact can distinguish a verified Fable receipt from a
  backend substitution.
- The upstream 3.21 streaming transport, idle guard, derived supervisor window,
  and repeated wait slices remain intact; this fork changes model policy rather
  than maintaining a parallel timeout implementation.

Keep the code-review, doc-review, and POV route mappings aligned when changing
the policy. Code-review and doc-review kernel parity is enforced in tests.
