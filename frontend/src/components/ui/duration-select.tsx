'use client';

import React from 'react';
import { DURATION_OPTIONS } from '@/lib/constants';
import type { DurationSelectProps } from '@/lib/types';

export const DurationSelect: React.FC<DurationSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 rounded-lg border bg-white/5 backdrop-blur-sm text-white"
      style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
      }}
    >
      <option value="" className="bg-gray-900">Select expiration time</option>
      {DURATION_OPTIONS.map((option) => (
        <option key={option.value} value={option.value} className="bg-gray-900">
          {option.label}
        </option>
      ))}
    </select>
  );
};