# Modeling Audit

Notes from the current API-modeling pass over the supported SlackBlock surface.

## Section

Status: corrected

Changes:
- `text` is now optional and can be provided as a `string` or `<Text>` element
- `fields` is now an explicit prop
- `children` remains supported as a backward-compatible alias for fields
- `expand` is now modeled and serialized

Result:
- SlackBlock can now express section blocks with `text`, `fields`, or both
- fields-only sections no longer require a type cast

## Other supported components

Current audit result:
- no other supported component required a public API widening in this pass

Follow-up candidates:
- section accessory compatibility could be validated more explicitly against Slack's supported accessory union
- broader support-surface documentation still belongs in the support matrix work
