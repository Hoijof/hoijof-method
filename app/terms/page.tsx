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
            If you disagree with any part of these terms, you may not access Service.
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
            As a user of Service, you agree to:
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
          <p className="text-slate-700 leading-relaxed">
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
          <p className="text-slate-700 leading-relaxed">
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