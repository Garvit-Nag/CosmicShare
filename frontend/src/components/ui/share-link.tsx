'use client';

import React from 'react';
import { Copy } from 'lucide-react';
import type { ShareLinkProps } from '@/lib/types';

export const ShareLink: React.FC<ShareLinkProps> = ({ url }): JSX.Element => {
  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (error: unknown) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link');
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 rounded-lg bg-white/5 backdrop-blur-sm">
      <input
        type="text"
        value={url}
        readOnly
        className="flex-1 bg-transparent border-none outline-none text-white"
      />
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
      >
        <Copy className="w-4 h-4" />
      </button>
    </div>
  );
};