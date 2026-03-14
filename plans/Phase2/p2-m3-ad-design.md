# P2-M3 Ads Design

**Status:** APPROVED

## Goal
Add ad infrastructure and placeholder ad placements to the app UI without external ad network dependencies.

## Decisions
- Implement an internal `AdSlot` component that renders a styled placeholder with `Sponsored` labeling.
- Keep ads client-only with no external scripts, tracking, or network calls.
- Use simple config to toggle ads on/off and to define multiple placements.
- Add a top banner placement and an inline placement within the main page layout.

## Architectural Design
### Data Model
- `type AdSlotConfig = { id: string; label: string; size: string; placement: "banner" | "inline" }`
- `const ADS_ENABLED = true` and `const AD_SLOTS: AdSlotConfig[]`

### UI Impacts
- Render a banner ad below the header and above the stepper.
- Render an inline ad below the main content card and above the bottom navigation.

### Type Updates
- Add `AdSlotConfig` type and `AdSlot` component.

## Testing Strategy
- Verify ad slots render when ads are enabled.
- Verify each placement exposes a predictable `data-testid` for future integration.
