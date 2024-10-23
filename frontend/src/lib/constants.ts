// src/lib/constants.ts
export const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.mp3', '.mp4', '.mov', '.zip', '.rar'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

// Add console.log to debug
console.log('API URL from env:', process.env.NEXT_PUBLIC_API_URL);

// Add a fallback URL in case env fails to load
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://garvitcpp-cosmicsharemain.hf.space/api/upload';

export const DURATION_OPTIONS = [
  { label: '30 Seconds', value: '30s' },
  { label: '24 Hours', value: '24h' },
  { label: '3 Days', value: '3d' },
  { label: '5 Days', value: '5d' },
  { label: '1 Week', value: '7d' },
];