# P3-M1 Legal Pages & Footer Design

**Status:** APPROVED

## Goal

Add required legal pages (Privacy Policy, Terms of Service, Cookie Policy) and a footer component for Google AdSense policy compliance.

## Decisions

- Create separate route pages for each legal document (not modal dialogs)
- Implement a Footer component with links to all legal pages
- Include Footer component in root layout for site-wide visibility
- Use consistent styling with existing Hoijof Builder aesthetic
- Display contact email (hoijof@gmail.com) on all legal pages
- Keep content minimal but compliant with AdSense requirements

## Architectural Design

### Data Model

No new data models. All content is static text.

### UI Impacts

- **Footer Component:** Fixed-position or site-wide footer containing links to legal pages and contact info
- **Privacy Policy Page:** `/privacy` route with sections on data collection, cookies, AdSense disclosure, user rights
- **Terms of Service Page:** `/terms` route with sections on service description, user responsibilities, liability
- **Cookie Policy Page:** `/cookies` route with sections on cookie types, AdSense cookies, management instructions
- **Root Layout:** Updated to include Footer component below main content

### Type Updates

No new types needed. Using standard React/Next.js types.

### File Structure

```
app/
├── components/
│   └── Footer.tsx          # NEW - Footer component
├── privacy/
│   └── page.tsx            # NEW - Privacy Policy page
├── terms/
│   └── page.tsx            # NEW - Terms of Service page
├── cookies/
│   └── page.tsx            # NEW - Cookie Policy page
├── layout.tsx              # MODIFIED - Import and render Footer
└── globals.css             # MODIFIED - Add footer-specific styles if needed
```

### Page Metadata

Each legal page will include:
- Title: "Privacy Policy | Hoijof Builder", etc.
- Description: SEO-friendly description
- Canonical URL

## Content Requirements

### Privacy Policy Must Include

1. **Data Collection:**
   - Information collected (usage patterns, preferences via LocalStorage)
   - Cookies used by Google AdSense
   - No personal data storage (session-only API keys)

2. **Third-Party Services:**
   - Google AdSense for advertising
   - Google DoubleClick for ad personalization
   - Google AI API for AI features (user-provided key)

3. **User Rights:**
   - Right to access stored preferences
   - Right to clear LocalStorage
   - Right to opt out of cookies

4. **Contact:**
   - Email: hoijof@gmail.com
   - Privacy-related inquiries

### Terms of Service Must Include

1. **Service Description:**
   - Hoijof Builder is a planning/documentation tool
   - Client-side only application
   - No warranty of fitness for purpose

2. **User Responsibilities:**
   - Responsible for API key management
   - Responsible for exported content usage
   - Acceptable use of the tool

3. **Limitations:**
   - No liability for data loss
   - Service provided "as is"
   - Right to modify service at any time

4. **Contact:**
   - Email: hoijof@gmail.com
   - Legal inquiries

### Cookie Policy Must Include

1. **Cookie Types:**
   - Google AdSense cookies (DoubleClick)
   - LocalStorage for app state persistence
   - Session-only storage for API keys

2. **AdSense Cookie Disclosure:**
   - Google uses cookies for ad personalization
   - Privacy Policy link
   - Google Ads Settings link

3. **Management:**
   - How to clear browser cookies
   - How to clear LocalStorage
   - Browser settings instructions

4. **Contact:**
   - Email: hoijof@gmail.com
   - Cookie-related inquiries

### Footer Component

Contains:
- Logo and branding
- Links: Privacy Policy, Terms of Service, Cookie Policy
- Contact email display
- Copyright notice

## Testing Strategy

1. **Footer Component Tests:**
   - Verify footer renders with all links
   - Verify links navigate to correct routes
   - Verify footer is accessible (ARIA labels)
   - Verify footer appears on all pages

2. **Privacy Policy Tests:**
   - Verify page renders at `/privacy` route
   - Verify contact email is displayed
   - Verify key sections are present (Data Collection, AdSense disclosure, Contact)

3. **Terms of Service Tests:**
   - Verify page renders at `/terms` route
   - Verify contact email is displayed
   - Verify key sections are present (Service Description, Liability, Contact)

4. **Cookie Policy Tests:**
   - Verify page renders at `/cookies` route
   - Verify contact email is displayed
   - Verify key sections are present (Cookie Types, AdSense, Management)

5. **Integration Tests:**
   - Verify Footer is included on main page
   - Verify Footer is included on all legal pages
   - Verify navigation works bidirectionally

## Definition of Done

1. All legal pages accessible at correct routes
2. Footer visible on all pages with working links
3. Contact email (hoijof@gmail.com) displayed on all legal pages
4. Content compliant with Google AdSense requirements
5. All tests passing
6. Production build successful
7. UI visually verified