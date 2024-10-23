import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from './constants';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const validateFile = (file: File): string | null => {
  const extension = '.' + file.name.split('.').pop()?.toLowerCase();
  
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return `File type not allowed. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`;
  }
  
  if (file.size > MAX_FILE_SIZE) {
    return 'File size exceeds 50MB limit';
  }
  
  return null;
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}