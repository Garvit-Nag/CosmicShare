'use client';

import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { validateFile, formatBytes } from '@/lib/utils';
import { ALLOWED_EXTENSIONS } from '@/lib/constants';
import { useToast } from './use-toast';
import type { FileUploadProps } from '@/lib/types';

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }): JSX.Element => {
  const { success, error, warning } = useToast();

  const handleFileChange = useCallback((file: File | null): void => {
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        error(`Upload failed: ${validationError}`);
        if (validationError.includes('file type')) {
          warning(`Supported formats: ${ALLOWED_EXTENSIONS.join(', ')}`);
        }
        return;
      }
      onFileSelect(file);
      success('File uploaded successfully!');
    }
  }, [onFileSelect, success, error, warning]);

  return (
    <div 
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-all relative"
      onClick={(): void => document.getElementById('fileInput')?.click()}
      onDragOver={(e): void => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e): void => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        handleFileChange(file);
      }}
    >
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={(e): void => handleFileChange(e.target.files?.[0] || null)}
        accept={ALLOWED_EXTENSIONS.join(',')}
      />
      <Upload className={`w-12 h-12 mx-auto mb-4 ${selectedFile ? 'text-green-500' : 'text-gray-400'}`} />
      <p className="text-sm mb-2">
        {selectedFile ? (
          <span className="text-green-500 block truncate max-w-full px-4">
            File ready for upload: {selectedFile.name}
          </span>
        ) : (
          <span className="text-white">
            Drag and drop or click to select a file
          </span>
        )}
      </p>
      {selectedFile && (
        <p className="text-xs text-gray-500">
          Size: {formatBytes(selectedFile.size)}
        </p>
      )}
    </div>
  );
};