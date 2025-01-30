import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Garvit-Nag' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/garvit-nag/' },
  { icon: Mail, href: 'mailto:garvitcpp@gmail.com' }
];

export const Footer = (): JSX.Element => {
  return (
    <footer className="relative bg-gradient-to-t from-black via-black/95 to-transparent pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                CosmicShare
              </h3>
              <p className="text-sm text-gray-300 text-center md:text-left max-w-xs">
                Secure, fast, and easy file sharing with expiring links. Your files, your control.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} CosmicShare. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;