'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Layers } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <Target className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">TenderLens</span>
        </Link>
        
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className={`hover:text-primary transition-colors ${pathname === '/' ? 'text-primary' : ''}`}>
            Home
          </Link>
          <Link href="/analyzer" className={`hover:text-primary transition-colors ${pathname === '/analyzer' ? 'text-primary' : ''}`}>
            Analyzer
          </Link>
          <Link href="/dashboard" className={`hover:text-primary transition-colors ${pathname === '/dashboard' ? 'text-primary' : ''}`}>
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
