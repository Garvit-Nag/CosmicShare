import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

interface SocialLink {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}

export const Footer = (): JSX.Element => {
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com/Garvit-Nag', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/garvit-nag-b3871531b/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email Us' }
  ];

  const navigationLinks: string[] = ['home', 'features', 'contact'];

  return (
    <footer className="relative bg-gradient-to-t from-black via-black/95 to-transparent pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                CosmicShare
              </h3>
              <p className="text-sm text-gray-300">
                Secure, fast, and easy file sharing with expiring links. Your files, your control.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link}>
                    <button
                      onClick={(): void => scrollToSection(link)}
                      className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="flex flex-col gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Newsletter</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-cyan-500 focus:outline-none text-sm text-white"
                />
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-colors text-sm text-white whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} CosmicShare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};