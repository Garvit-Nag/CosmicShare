import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface NavLink {
  id: string;
  label: string;
}

export const Navbar = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navLinks: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/20 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
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
            {navLinks.map(({ id, label }) => (
              <button 
                key={id}
                onClick={(): void => scrollToSection(id)}
                className="relative group px-4 py-2"
              >
                <span className="relative z-10 text-white/90 text-sm font-medium group-hover:text-white transition-colors">
                  {label}
                </span>
                <div className="absolute inset-x-0 -bottom-0.5 h-px w-0 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={(): void => scrollToSection('upload')}
              className="hidden sm:block px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Get Started
            </button>
            
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
            <div className="px-4 py-4 space-y-4">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={(): void => scrollToSection(id)}
                  className="block w-full text-left px-4 py-2 text-white/90 hover:text-white"
                >
                  {label}
                </button>
              ))}
              <button
                onClick={(): void => scrollToSection('upload')}
                className="block w-full px-4 py-2 text-left text-white/90 hover:text-white"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};