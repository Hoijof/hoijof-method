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
            <span className="text-xs text-slate-400 ml-2">
              © {year} Hoijof Builder. All rights reserved.
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
      </div>
    </footer>
  );
}