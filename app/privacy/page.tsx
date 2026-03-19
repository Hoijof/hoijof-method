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
            Hoijof Builder is a client-side application. Your data is stored locally in your browser and is not transmitted to our servers (except for API key used directly with Google's services from your browser).
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