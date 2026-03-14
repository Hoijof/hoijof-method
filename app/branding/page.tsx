export const metadata = {
  title: "Hoijof Builder Brand Assets",
  description: "Logos, favicon, and palette for Hoijof Builder.",
};

const BrandPage = () => (
  <div className="min-h-screen bg-slate-50 pb-20 text-slate-900">
    <header className="bg-slate-900 px-6 py-16 text-center text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Hoijof Brand Guidelines
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Official SVG assets, favicons, and typography for the Hoijof Builder.
        </p>
      </div>
    </header>

    <main className="mx-auto mt-12 flex max-w-5xl flex-col gap-16 px-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold">The Concept: The &ldquo;Staggered H&rdquo;</h2>
        <p className="mt-4 leading-relaxed text-slate-600">
          The Hoijof methodology is about structured, phased growth. The primary
          mark is a custom-drawn letter &ldquo;H&rdquo;: the left pillar represents
          the foundational MVP, the right pillar steps upward for scaling, and
          the crossbar connects the journey from idea to mature product.
        </p>
        <div className="mt-6 flex gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-900 p-3 shadow-md">
            <img src="/logo-mark.svg" alt="Hoijof logo mark" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold">1. Full Logo (Light Theme)</h3>
            <a
              href="/logo-full.svg"
              download
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Download SVG
            </a>
          </div>
          <div className="flex min-h-[200px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-8">
            <img
              src="/logo-full.svg"
              alt="Hoijof Builder full logo"
              className="w-full max-w-[280px]"
            />
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Used for navigation bars and wide landing page headers.
          </p>
        </section>

        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold">2. Logo Mark</h3>
            <a
              href="/logo-mark.svg"
              download
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Download SVG
            </a>
          </div>
          <div className="flex min-h-[200px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-8">
            <img
              src="/logo-mark.svg"
              alt="Hoijof logo mark"
              className="h-32 w-32 rounded-3xl shadow-xl"
            />
          </div>
          <p className="mt-4 text-sm text-slate-500">
            The standalone icon used for avatars and square formats.
          </p>
        </section>

        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold">3. Browser Favicon</h3>
            <a
              href="/favicon.svg"
              download
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Download SVG
            </a>
          </div>
          <div className="flex min-h-[200px] flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 p-8">
            <img src="/favicon.svg" alt="Hoijof favicon" className="h-16 w-16" />
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Simplified, solid-color version optimized for 32x32px tabs.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold">4. Core Palette</h3>
          <div className="mt-6 flex gap-4">
            <div className="flex-1">
              <div className="h-16 w-full rounded-t-xl bg-[#0f172a]" />
              <div className="rounded-b-xl border border-t-0 border-slate-200 p-3 text-center">
                <div className="text-sm font-bold">Slate 900</div>
                <div className="text-xs font-mono text-slate-500">#0f172a</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-16 w-full rounded-t-xl bg-[#4f46e5]" />
              <div className="rounded-b-xl border border-t-0 border-slate-200 p-3 text-center">
                <div className="text-sm font-bold">Indigo 600</div>
                <div className="text-xs font-mono text-slate-500">#4f46e5</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-16 w-full rounded-t-xl bg-[#818cf8]" />
              <div className="rounded-b-xl border border-t-0 border-slate-200 p-3 text-center">
                <div className="text-sm font-bold">Indigo 400</div>
                <div className="text-xs font-mono text-slate-500">#818cf8</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
);

export default BrandPage;
