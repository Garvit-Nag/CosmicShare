import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Github } from 'lucide-react';

interface NavLink {
  id: string;
  href: string;
  label: string;
}

export const Navbar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { id: 'home', href: '/', label: 'Home' },
    { id: 'about', href: '/about', label: 'About' }
  ];

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/20 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <Image 
              src="/logo.png" 
              alt="CosmicShare" 
              width={180} 
              height={45} 
              className="h-8 w-auto sm:h-10" 
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center gap-8 lg:gap-12">
            {navLinks.map(({ id, href, label }) => (
              <Link 
                key={id}
                href={href}
                className="relative group px-4 py-2"
              >
                <span className="relative z-10 text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                  {label}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-px w-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500/50 via-blue-600/50 to-cyan-500/50 group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Garvit-Nag/CosmicShare"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
            >
              <Github className="h-4 w-4" />
              Github
            </a>
            
            {/* Mobile Menu Button */}
            <button
              onClick={(): void => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/5">
            <div className="flex flex-col items-center py-6 space-y-6">
              {navLinks.map(({ id, href, label }) => (
                <Link
                  key={id}
                  href={href}
                  className="relative text-center w-full px-4 py-2 text-white/90 hover:text-white transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  onClick={(): void => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://github.com/Garvit-Nag/CosmicShare"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-700"
                onClick={(): void => setIsMobileMenuOpen(false)}
              >
                <Github className="h-4 w-4" />
                Github
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};