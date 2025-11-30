'use client';

import { Terminal, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400">
              Built with{' '}
              <Heart className="inline w-4 h-4 text-red-500 fill-red-500" />{' '}
              using Next.js & AI
            </span>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
