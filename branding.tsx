<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hoijof Builder - Brand Assets</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .checkerboard {
      background-image: linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen pb-20">

  <header class="bg-slate-900 text-white py-16 px-6 text-center">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-4xl font-extrabold mb-4 tracking-tight">Hoijof Brand Guidelines</h1>
      <p class="text-slate-400 text-lg">Official SVG assets, favicons, and typography for the Hoijof App Builder.</p>
    </div>
  </header>

  <main class="max-w-5xl mx-auto px-6 mt-12 space-y-16">

    <!-- Concept Section -->
    <section class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 class="text-2xl font-bold mb-4">The Concept: The "Staggered H"</h2>
      <p class="text-slate-600 mb-6 leading-relaxed">
        The Hoijof methodology is all about structured, phased growth. To represent this, the primary mark is a custom-drawn letter "H". The left pillar represents the foundational MVP, while the right pillar steps upward, representing scaling and future phases. The central crossbar connects the journey, symbolizing the transition from idea to mature product.
      </p>
      <div class="flex gap-4">
        <div class="w-16 h-16 rounded-xl bg-slate-900 shadow-md p-3">
          <!-- The SVG Mark -->
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
            <defs>
              <linearGradient id="hoijofGrad" x1="28" y1="20" x2="72" y2="80" gradientUnits="userSpaceOnUse">
                <stop stop-color="#818CF8"/>
                <stop offset="1" stop-color="#4F46E5"/>
              </linearGradient>
            </defs>
            <path d="M44 44 V40 C44 35.58 40.42 32 36 32 C31.58 32 28 35.58 28 40 V72 C28 76.42 31.58 80 36 80 C40.42 80 44 76.42 44 72 V56 H56 V60 C56 64.42 59.58 68 64 68 C68.42 68 72 64.42 72 60 V28 C72 23.58 68.42 20 64 20 C59.58 20 56 23.58 56 28 V44 H44 Z" fill="url(#hoijofGrad)"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Assets Grids -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Full Logo (Light) -->
      <section class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">1. Full Logo (Light Theme)</h3>
          <button onclick="downloadSVG('logo-full')" class="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition">Download SVG</button>
        </div>
        <div class="flex-1 checkerboard rounded-xl border border-slate-200 flex items-center justify-center p-8 mb-4 min-h-[200px]">
          <svg id="logo-full" viewBox="0 0 350 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[280px]">
            <rect width="100" height="100" rx="24" fill="#0f172a"/>
            <defs>
              <linearGradient id="fullGrad" x1="28" y1="20" x2="72" y2="80" gradientUnits="userSpaceOnUse">
                <stop stop-color="#818CF8"/>
                <stop offset="1" stop-color="#4F46E5"/>
              </linearGradient>
            </defs>
            <path d="M44 44 V40 C44 35.58 40.42 32 36 32 C31.58 32 28 35.58 28 40 V72 C28 76.42 31.58 80 36 80 C40.42 80 44 76.42 44 72 V56 H56 V60 C56 64.42 59.58 68 64 68 C68.42 68 72 64.42 72 60 V28 C72 23.58 68.42 20 64 20 C59.58 20 56 23.58 56 28 V44 H44 Z" fill="url(#fullGrad)"/>
            <text x="120" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="44" font-weight="800" fill="#0F172A" letter-spacing="-0.02em">Hoijof</text>
            <text x="260" y="65" font-family="-apple-system, system-ui, sans-serif" font-size="44" font-weight="300" fill="#4F46E5" letter-spacing="-0.01em">Builder</text>
          </svg>
        </div>
        <p class="text-sm text-slate-500">Used for navigation bars and wide landing page headers.</p>
      </section>

      <!-- App Icon / Mark -->
      <section class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">2. Logo Mark</h3>
          <button onclick="downloadSVG('logo-mark')" class="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition">Download SVG</button>
        </div>
        <div class="flex-1 checkerboard rounded-xl border border-slate-200 flex items-center justify-center p-8 mb-4 min-h-[200px]">
          <svg id="logo-mark" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-32 h-32 shadow-xl rounded-3xl">
            <rect width="100" height="100" rx="24" fill="#0f172a"/>
            <defs>
              <linearGradient id="markGrad" x1="28" y1="20" x2="72" y2="80" gradientUnits="userSpaceOnUse">
                <stop stop-color="#818CF8"/>
                <stop offset="1" stop-color="#4F46E5"/>
              </linearGradient>
            </defs>
            <path d="M44 44 V40 C44 35.58 40.42 32 36 32 C31.58 32 28 35.58 28 40 V72 C28 76.42 31.58 80 36 80 C40.42 80 44 76.42 44 72 V56 H56 V60 C56 64.42 59.58 68 64 68 C68.42 68 72 64.42 72 60 V28 C72 23.58 68.42 20 64 20 C59.58 20 56 23.58 56 28 V44 H44 Z" fill="url(#markGrad)"/>
          </svg>
        </div>
        <p class="text-sm text-slate-500">The standalone icon used for avatars and square formats.</p>
      </section>

      <!-- Favicon -->
      <section class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold">3. Browser Favicon</h3>
          <button onclick="downloadSVG('favicon')" class="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-indigo-700 transition">Download SVG</button>
        </div>
        <div class="flex-1 checkerboard rounded-xl border border-slate-200 flex items-center justify-center p-8 mb-4 min-h-[200px]">
          <!-- Displayed larger for preview, but scaled to 32x32 viewbox -->
          <svg id="favicon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-16 h-16">
            <rect width="32" height="32" rx="8" fill="#0F172A"/>
            <path d="M13 14 V12 C13 10.9 12.1 10 11 10 C9.9 10 9 10.9 9 12 V24 C9 25.1 9.9 26 11 26 C12.1 26 13 25.1 13 24 V18 H19 V20 C19 21.1 19.9 22 21 22 C22.1 22 23 21.1 23 20 V8 C23 6.9 22.1 6 21 6 C19.9 6 19 6.9 19 8 V14 Z" fill="#6366F1"/>
          </svg>
        </div>
        <p class="text-sm text-slate-500">Simplified, solid-color version optimized for 32x32px tabs.</p>
      </section>

      <!-- Color Palette -->
      <section class="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 class="text-xl font-bold mb-6">4. Core Palette</h3>
        <div class="flex gap-4">
          <div class="flex-1">
            <div class="h-16 w-full rounded-t-xl bg-[#0f172a]"></div>
            <div class="border border-t-0 border-slate-200 rounded-b-xl p-3 text-center">
              <div class="font-bold text-sm">Slate 900</div>
              <div class="text-xs text-slate-500 font-mono">#0f172a</div>
            </div>
          </div>
          <div class="flex-1">
            <div class="h-16 w-full rounded-t-xl bg-[#4f46e5]"></div>
            <div class="border border-t-0 border-slate-200 rounded-b-xl p-3 text-center">
              <div class="font-bold text-sm">Indigo 600</div>
              <div class="text-xs text-slate-500 font-mono">#4f46e5</div>
            </div>
          </div>
          <div class="flex-1">
            <div class="h-16 w-full rounded-t-xl bg-[#818cf8]"></div>
            <div class="border border-t-0 border-slate-200 rounded-b-xl p-3 text-center">
              <div class="font-bold text-sm">Indigo 400</div>
              <div class="text-xs text-slate-500 font-mono">#818cf8</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </main>

  <script>
    function downloadSVG(svgId) {
      const svg = document.getElementById(svgId);
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);
      
      // Add XML declaration
      if(!source.match(/^<\?xml[^>]+>/)){
          source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
      }
      
      const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
      
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `${svgId}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  </script>
</body>
</html>