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