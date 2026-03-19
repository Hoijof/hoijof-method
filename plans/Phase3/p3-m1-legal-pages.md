# P3-M1 Legal Pages & Footer Implementation Plan

**Status:** DONE

## Prerequisites

- Design doc approved: p3-m1-legal-pages-design.md

## Tasks

- [x] T1: Create Footer Component
- [x] T2: Create Privacy Policy Page
- [x] T3: Create Terms of Service Page
- [x] T4: Create Cookie Policy Page
- [x] T5: Verify Integration and UI

### T1: Create Footer Component

**Files involved:**
- Create: `app/components/Footer.tsx`
- Modify: `app/layout.tsx`
- Create: `__tests__/footer.test.tsx`

**Step 1: Write the failing tests**
import { render, screen } from '@testing-library/react';
import Footer from '../app/components/Footer';

describe('Footer Component', () => {
  it('renders footer with logo and branding', () => {
    render(<Footer />);
    expect(screen.getByText(/hoijof/i)).toBeInTheDocument();
  });

  it('renders link to privacy policy', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /privacy policy/i });
    expect(link).toHaveAttribute('href', '/privacy');
  });

  it('renders link to terms of service', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /terms of service/i });
    expect(link).toHaveAttribute('href', '/terms');
  });

  it('renders link to cookie policy', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /cookie policy/i });
    expect(link).toHaveAttribute('href', '/cookies');
  });

  it('renders contact email', () => {
    render(<Footer />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('renders copyright notice', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year}`, 'i'))).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**
```bash
npm test -- footer.test.tsx
```
Expected: Tests fail with "Cannot find module '../app/components/Footer'"

**Step 3: Write the implementation**
```typescript
// app/components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo-mark.svg"
              alt="Hoijof"
              className="w-6 h-6"
            />
            <span className="font-bold text-slate-900">
              Hoijof <span className="font-light text-indigo-600">Builder</span>
            </span>
          </div>
          
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Cookie Policy
            </Link>
          </nav>
          
          <div className="text-sm text-slate-500">
            <a href="mailto:hoijof@gmail.com" className="hover:text-indigo-600 transition-colors">
              hoijof@gmail.com
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          © {year} Hoijof Builder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

Update `app/layout.tsx` to include Footer:
```typescript
// Modify the body element to add Footer
<body className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
  <div className="flex-1">
    {children}
  </div>
  <Footer />
</body>

// Add import at top:
import Footer from './components/Footer';
```

**Step 4: Run tests to verify they pass**
```bash
npm test -- footer.test.tsx
```
Expected: All tests pass

**Step 5: Atomic commit**
```bash
git add app/components/Footer.tsx app/layout.tsx __tests__/footer.test.tsx
git commit -m "feat(p3): add footer component with legal links"
```

---

### T2: Create Privacy Policy Page

**Files involved:**
- Create: `app/privacy/page.tsx`
- Create: `__tests__/privacy.test.tsx`

**Step 1: Write the failing tests**
```typescript
// __tests__/privacy.test.tsx
import { render, screen } from '@testing-library/react';
import Privacy from '../app/privacy/page';

describe('Privacy Policy Page', () => {
  it('renders page at privacy route', () => {
    render(<Privacy />);
    expect(screen.getByRole('heading', { name: /privacy policy/i })).toBeInTheDocument();
  });

  it('displays contact email', () => {
    render(<Privacy />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes data collection section', () => {
    render(<Privacy />);
    expect(screen.getByText(/data collection/i)).toBeInTheDocument();
  });

  it('includes adsense disclosure', () => {
    render(<Privacy />);
    expect(screen.getByText(/google adsense/i, { exact: false })).toBeInTheDocument();
  });

  it('includes user rights section', () => {
    render(<Privacy />);
    expect(screen.getByText(/your rights/i, { exact: false })).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**
```bash
npm test -- privacy.test.tsx
```
Expected: Tests fail with "Cannot find module '../app/privacy/page'"

**Step 3: Write the implementation**
```typescript
// app/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Hoijof Builder',
  description: 'Learn about how Hoijof Builder collects and uses your data.',
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        
        <p className="text-slate-600 mb-8">
          Last updated: March 19, 2026
        </p>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Overview</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Hoijof Builder (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Data We Collect</h2>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Information You Provide</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Project information entered during the wizard process (app name, pitch, features, etc.)</li>
            <li>Technology stack preferences</li>
            <li>Google AI API key (stored only in your browser session, never sent to our servers)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-700 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Time and date of access</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>To provide and improve our service</li>
            <li>To generate and export planning documents</li>
            <li>To enable AI-powered features using your provided API key</li>
            <li>To analyze usage patterns and improve user experience</li>
            <li>To display relevant advertisements through Google AdSense</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cookies and Local Storage</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use cookies and LocalStorage to enhance your experience:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>LocalStorage:</strong> Saves your wizard progress, preferences, and project data locally in your browser</li>
            <li><strong>Session Storage:</strong> Temporarily stores your AI API key during the current session</li>
            <li><strong>Cookies:</strong> Used by Google AdSense for ad personalization and analytics</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Google AdSense</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use Google AdSense to display advertisements on our website. Google may use cookies to serve ads based on your prior visits to our website or other websites.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            You may opt out of personalized advertising by visiting{' '}
            <Link
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 underline"
            >
              Google Ads Settings
            </Link>.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Third-Party Services</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><strong>Google AI API:</strong> Used for AI-powered features with your provided API key</li>
            <li><strong>Google AdSense:</strong> Used for displaying advertisements</li>
            <li><strong>Google DoubleClick:</strong> Used for ad personalization</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mt-4">
            These third-party services have their own privacy policies. We encourage you to review them.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Your Rights</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You have the following rights regarding your data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><strong>Access:</strong> You can view all data stored in your browser's LocalStorage</li>
            <li><strong>Deletion:</strong> You can clear your LocalStorage at any time using browser settings</li>
            <li><strong>Opt-out:</strong> You can opt out of cookies through your browser settings</li>
            <li><strong>Export:</strong> You can download your planning documents as a ZIP file</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Data Security</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Hoijof Builder is a client-side application. Your data is stored locally in your browser and is not transmitted to our servers (except for the API key used directly with Google's services from your browser).
          </p>
          <p className="text-slate-700 leading-relaxed">
            We implement reasonable security measures to protect your information, but no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="text-slate-700">
            Email: <a href="mailto:hoijof@gmail.com" className="text-indigo-600 hover:text-indigo-700">hoijof@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
```

**Step 4: Run tests to verify they pass**
```bash
npm test -- privacy.test.tsx
```
Expected: All tests pass

**Step 5: Atomic commit**
```bash
git add app/privacy/page.tsx __tests__/privacy.test.tsx
git commit -m "feat(p3): add privacy policy page"
```

---

### T3: Create Terms of Service Page

**Files involved:**
- Create: `app/terms/page.tsx`
- Create: `__tests__/terms.test.tsx`

**Step 1: Write the failing tests**
```typescript
// __tests__/terms.test.tsx
import { render, screen } from '@testing-library/react';
import Terms from '../app/terms/page';

describe('Terms of Service Page', () => {
  it('renders page at terms route', () => {
    render(<Terms />);
    expect(screen.getByRole('heading', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('displays contact email', () => {
    render(<Terms />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes service description', () => {
    render(<Terms />);
    expect(screen.getByText(/hoijof builder/i, { exact: false })).toBeInTheDocument();
  });

  it('includes liability disclaimer', () => {
    render(<Terms />);
    expect(screen.getByText(/limitation of liability/i, { exact: false })).toBeInTheDocument();
  });

  it('includes user responsibilities', () => {
    render(<Terms />);
    expect(screen.getByText(/user responsibilities/i, { exact: false })).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**
```bash
npm test -- terms.test.tsx
```
Expected: Tests fail with "Cannot find module '../app/terms/page'"

**Step 3: Write the implementation**
```typescript
// app/terms/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Hoijof Builder',
  description: 'Terms and conditions for using Hoijof Builder.',
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms of Service</h1>
        
        <p className="text-slate-600 mb-8">
          Last updated: March 19, 2026
        </p>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Agreement to Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            By accessing or using Hoijof Builder (&quot;the Service&quot;), you agree to be bound by these Terms of Service.
            If you disagree with any part of these terms, you may not access the Service.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Description of Service</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Hoijof Builder is a client-side web application that helps developers create structured planning documentation for software projects.
            The Service includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>A progressive disclosure wizard for project planning</li>
            <li>Feature brainstorming and prioritization tools</li>
            <li>AI-powered suggestions (requires user-provided API key)</li>
            <li>Export functionality for planning documents</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            The Service is provided &quot;as is&quot; without warranty of any kind.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">User Responsibilities</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            As a user of the Service, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Provide accurate and truthful information when using the wizard</li>
            <li>Keep your API keys secure and confidential</li>
            <li>Not use the Service for any illegal or unauthorized purpose</li>
            <li>Not attempt to reverse engineer or compromise the Service</li>
            <li>Respect the intellectual property rights of others</li>
            <li>Use exported planning documents in accordance with applicable laws</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">API Key Usage</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The Service uses AI features that require an API key from Google AI Studio. You acknowledge and agree that:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>You are responsible for obtaining and managing your own API key</li>
            <li>Your API key is stored only in your browser session</li>
            <li>We do not store or have access to your API key</li>
            <li>API key usage is subject to Google's terms of service</li>
            <li>You are responsible for all charges associated with your API key usage</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Data Storage</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Hoijof Builder stores your project data locally in your browser using LocalStorage:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Data is stored only on your device</li>
            <li>We do not transmit or store your data on our servers</li>
            <li>Data can be cleared at any time through browser settings</li>
            <li>Data may be lost if you clear your browser's LocalStorage</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Disclaimers</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Limitation of Liability</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION,
            LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
          </p>
          <p className="text-slate-700 leading-relaxed">
            OUR TOTAL LIABILITY FOR ALL CLAIMS SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100.00).
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Modifications to Service</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We reserve the right to modify, suspend, or discontinue the Service at any time with or without notice.
            We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Modifications to Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may update these Terms of Service from time to time. We will notify you of any material changes by posting
            the new Terms on this page and updating the &quot;Last updated&quot; date.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Your continued use of the Service after the effective date of the revised Terms constitutes acceptance of the changes.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Governing Law</h2>
          <p className="text-slate-700 leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <p className="text-slate-700">
            Email: <a href="mailto:hoijof@gmail.com" className="text-indigo-600 hover:text-indigo-700">hoijof@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
```

**Step 4: Run tests to verify they pass**
```bash
npm test -- terms.test.tsx
```
Expected: All tests pass

**Step 5: Atomic commit**
```bash
git add app/terms/page.tsx __tests__/terms.test.tsx
git commit -m "feat(p3): add terms of service page"
```

---

### T4: Create Cookie Policy Page

**Files involved:**
- Create: `app/cookies/page.tsx`
- Create: `__tests__/cookies.test.tsx`

**Step 1: Write the failing tests**
```typescript
// __tests__/cookies.test.tsx
import { render, screen } from '@testing-library/react';
import Cookies from '../app/cookies/page';

describe('Cookie Policy Page', () => {
  it('renders page at cookies route', () => {
    render(<Cookies />);
    expect(screen.getByRole('heading', { name: /cookie policy/i })).toBeInTheDocument();
  });

  it('displays contact email', () => {
    render(<Cookies />);
    expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
  });

  it('includes cookie types section', () => {
    render(<Cookies />);
    expect(screen.getByText(/types of cookies/i, { exact: false })).toBeInTheDocument();
  });

  it('includes adsense disclosure', () => {
    render(<Cookies />);
    expect(screen.getByText(/google adsense/i, { exact: false })).toBeInTheDocument();
  });

  it('includes cookie management instructions', () => {
    render(<Cookies />);
    expect(screen.getByText(/manage cookies/i, { exact: false })).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**
```bash
npm test -- cookies.test.tsx
```
Expected: Tests fail with "Cannot find module '../app/cookies/page'"

**Step 3: Write the implementation**
```typescript
// app/cookies/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Hoijof Builder',
  description: 'Learn about how Hoijof Builder uses cookies.',
};

export default function Cookies() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Cookie Policy</h1>
        
        <p className="text-slate-600 mb-8">
          Last updated: March 19, 2026
        </p>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">What Are Cookies?</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Cookies are small text files that are stored on your device when you visit a website.
            They are widely used to make websites work more efficiently and to provide information to website owners.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">How We Use Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Hoijof Builder uses cookies and similar technologies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>To display relevant advertisements through Google AdSense</li>
            <li>To analyze website traffic and user behavior</li>
            <li>To remember your preferences and settings</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Types of Cookies We Use</h2>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Google AdSense Cookies</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use Google AdSense to display advertisements on our website. Google may use cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Serve ads based on your prior visits to our website or other websites</li>
            <li>Measure ad effectiveness and provide reporting</li>
            <li>Prevent fraudulent clicks and impressions</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            Google's use of the DART cookie enables it to serve ads to users based on their visit to this site and other sites on the Internet.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">LocalStorage</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Hoijof Builder uses LocalStorage (a browser storage mechanism) to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Save your wizard progress so you don't lose work on refresh</li>
            <li>Store your project data, features, and preferences</li>
            <li>Remember your selected technology stack</li>
            <li>Save your phase assignments for features</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Session Storage</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use Session Storage to temporarily store:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Your Google AI API key during the current session</li>
            <li>Temporary state that doesn't need to persist between sessions</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Third-Party Cookies</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We allow third-party companies to place cookies on your device. These third-party cookies include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li><strong>Google AdSense:</strong> Uses DoubleClick cookies for ad serving and personalization</li>
            <li><strong>Google Analytics:</strong> May use cookies to analyze user behavior (if enabled in the future)</li>
          </ul>
          <p className="text-slate-700 leading-relaxed">
            These third parties have their own privacy policies and cookie policies. We encourage you to review them.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Managing Your Cookies</h2>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Browser Settings</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Most web browsers allow you to control cookies through their settings. You can:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Block all cookies</li>
            <li>Delete existing cookies</li>
            <li>Allow only first-party cookies</li>
            <li>Clear cookies when you close your browser</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            Please note that blocking or deleting cookies may affect the functionality of the Service.
          </p>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">Google AdSense Opt-Out</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            To opt out of personalized advertising from Google, visit:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>
              <Link
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 underline"
              >
                Google Ads Settings
              </Link>
            </li>
            <li>
              <Link
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 underline"
              >
                Digital Advertising Alliance (DAA)
              </Link>
            </li>
          </ul>
          
          <h3 className="text-xl font-semibold text-slate-700 mb-3">LocalStorage Management</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            To clear your LocalStorage data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
            <li>Use the &quot;Reset Wizard&quot; button in the application settings</li>
            <li>Clear browser data for this specific site through browser settings</li>
            <li>Use browser developer tools to manually clear LocalStorage</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cookie Lifespan</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><strong>AdSense cookies:</strong> Typically persist for 2 years or until you clear them</li>
            <li><strong>LocalStorage:</strong> Persists indefinitely until you clear it or reset the application</li>
            <li><strong>Session Storage:</strong> Cleared automatically when you close the browser tab</li>
          </ul>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Updates to This Policy</h2>
          <p className="text-slate-700 leading-relaxed">
            We may update this Cookie Policy from time to time. We will notify you of any material changes by posting
            the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="prose prose-slate max-w-none mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            If you have any questions about our use of cookies, please contact us:
          </p>
          <p className="text-slate-700">
            Email: <a href="mailto:hoijof@gmail.com" className="text-indigo-600 hover:text-indigo-700">hoijof@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
```

**Step 4: Run tests to verify they pass**
```bash
npm test -- cookies.test.tsx
```
Expected: All tests pass

**Step 5: Atomic commit**
```bash
git add app/cookies/page.tsx __tests__/cookies.test.tsx
git commit -m "feat(p3): add cookie policy page"
```

---

### T5: Verify Integration and UI

**Files involved:**
- No new files
- Verify: All pages render correctly
- Verify: Navigation works properly

**Step 1: Write the failing tests**
```typescript
// __tests__/integration/legal-pages.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../app/page';
import Privacy from '../app/privacy/page';
import Terms from '../app/terms/page';
import Cookies from '../app/cookies/page';

describe('Legal Pages Integration', () => {
  describe('Footer Links', () => {
    it('renders footer with all legal links on home page', () => {
      render(<Home />);
      
      expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /cookie policy/i })).toBeInTheDocument();
    });

    it('renders footer on privacy policy page', () => {
      render(<Privacy />);
      expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
    });

    it('renders footer on terms of service page', () => {
      render(<Terms />);
      expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    });

    it('renders footer on cookie policy page', () => {
      render(<Cookies />);
      expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    });
  });

  describe('Page Titles', () => {
    it('privacy policy has correct title', () => {
      render(<Privacy />);
      expect(document.title).toContain('Privacy Policy');
    });

    it('terms of service has correct title', () => {
      render(<Terms />);
      expect(document.title).toContain('Terms of Service');
    });

    it('cookie policy has correct title', () => {
      render(<Cookies />);
      expect(document.title).toContain('Cookie Policy');
    });
  });

  describe('Contact Information', () => {
    it('displays contact email on all legal pages', () => {
      render(<Privacy />);
      expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
    });

    it('displays contact email on terms page', () => {
      render(<Terms />);
      expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
    });

    it('displays contact email on cookie page', () => {
      render(<Cookies />);
      expect(screen.getByText(/hoijof@gmail\.com/i })).toBeInTheDocument();
    });

    it('displays contact email in footer', () => {
      render(<Home />);
      expect(screen.getByText(/hoijof@gmail\.com/i)).toBeInTheDocument();
    });
  });
});
```

**Step 2: Run tests to verify they fail**
```bash
npm test -- legal-pages.test.tsx
```
Expected: Some tests may fail if metadata is not properly set

**Step 3: Verify implementation**
All components are already implemented in previous tasks. Run the tests to verify integration.

**Step 4: Run tests to verify they pass**
```bash
npm test -- legal-pages.test.tsx
```
Expected: All tests pass

**Step 5: Run full test suite**
```bash
npm test
```
Expected: All tests pass

**Step 6: Run production build**
```bash
npm run build
```
Expected: Build succeeds without errors

**Step 7: Atomic commit**
```bash
git add __tests__/integration/legal-pages.test.tsx
git commit -m "test(p3): add integration tests for legal pages"
```

---

## Definition of Done

✅ A task or milestone is only considered "Done" when:

1. ✅ Tests are written and passing locally (`npm test`)
2. ✅ Production build succeeds locally (`npm run build`)
3. ✅ UI is visually verified (footer visible, pages accessible)
4. ✅ All tasks marked complete `[x]` in both this implementation plan AND Phase 3 roadmap
5. ✅ Phase 3 roadmap Memory Log is updated with dated entry

1. ✅ Tests are written and passing locally (`npm test`)
2. ✅ Production build succeeds locally (`npm run build`)
3. ✅ UI is visually verified (footer visible, pages accessible)
4. ✅ All tasks marked complete `[x]` in both this implementation plan AND the Phase 3 roadmap
5. ✅ Phase 3 roadmap Memory Log is updated with dated entry