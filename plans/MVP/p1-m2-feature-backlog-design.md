# P1-M2 Feature Backlog Design

**Status:** APPROVED

## Goal
Define how feature ideas are captured, listed, and prioritized (P1/P2/P3) in Step 3.

## Decisions
- Build Step 3 as a single-page form section in `app/page.tsx` with local state, consistent with the M1 wizard shell.
- Keep a simple vertical list of features with inline priority selection and delete actions.
- Default new features to priority `P2`.
- Use a single-line input with an inline Add button; Enter key submits the feature.
- Show a count of total features added and an empty-state placeholder when no items exist.
- Do not block navigation based on Step 3 completion in MVP.
- Provide a placeholder "Suggest Missing Core Features" button to validate UX (actual behavior is part of P6).
- Maintain the visual language from `schafolding.tsx`: rounded cards, slate/indigo palette, subtle shadows, and clean spacing.

## Architectural Design
### Data Model
- `features: FeatureItem[]`
- `newFeature: string`
- `FeatureItem = { id: string; text: string; priority: 1 | 2 | 3 }`
- IDs generated on add (string), with the expectation of later extension to include `phase` for M3.

### UI Impacts
- Step 3 section renders after Step 2, with a headline, helper text, and the feature input row.
- Feature list renders beneath the input row with priority dropdowns and delete icons.
- Empty state renders when list is empty.
- Feature count displays above the list.

### Type Updates
- Add `type FeatureItem = { id: string; text: string; priority: 1 | 2 | 3 }`.

## Testing Strategy
- Verify a feature can be added via typing and Enter or Add button.
- Verify new features default to P2.
- Verify priority can be changed to P1 or P3 via dropdown.
- Verify a feature can be deleted.
- Verify the empty-state placeholder renders when there are no features.
