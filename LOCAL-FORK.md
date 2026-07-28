# Compound Engineering — Sol/Fable local fork

Upstream base: Compound Engineering 3.20.0 at commit
`a9f6d530d4446d805a3100387dedd86268d7e695`.

Local cross-model review policy:

- Claude-hosted reviews call Codex with `gpt-5.6-sol` and
  `model_reasoning_effort="high"`.
- Codex-hosted reviews call Claude with `--model fable --effort max`.
- `ce-code-review`, `ce-doc-review`, and cross-model `ce-pov` use the same
  Codex/Claude mapping.
- The Claude model receipt matcher recognizes the `claude-fable-*` served-model
  family so the review artifact can distinguish a verified Fable receipt from a
  backend substitution.

Keep the two cross-model shell kernels in parity when changing the mapping.
