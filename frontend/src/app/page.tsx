'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { FileUpload } from '@/components/ui/file-upload';
import { DurationSelect } from '@/components/ui/duration-select';
import { ShareLink } from '@/components/ui/share-link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MultiStepLoader } from '@/components/ui/multi-step-loader';
import { Vortex } from '@/components/ui/vortex';
import { API_URL } from '@/lib/constants';
import type { UploadResponse } from '@/lib/types';

interface LoadingState {
  text: string;
}

const loadingStates: LoadingState[] = [
  { text: "Initializing Cosmic Gateway" },
  { text: "Establishing Stellar Connection" },
  { text: "Encrypting Data Payload" },
  { text: "Mapping Interstellar Route" },
  { text: "Generating Temporal Link" },
  { text: "Stabilizing Quantum Transfer" },
  { text: "Securing Cosmic Channel" },
  { text: "Upload Complete!" },
];

export default function Home(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleUpload = async (): Promise<void> => {
    if (!file || !duration) {
      setError('Please select a file and duration');
      return;
    }

    setIsUploading(true);
    setError('');
    setActiveStep(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      for (let i = 0; i < loadingStates.length - 1; i++) {
        setActiveStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const response = await axios.post<UploadResponse>(
        `${API_URL}?expiration=${duration}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setShareUrl(response.data.data.url);
      setActiveStep(loadingStates.length - 1);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="relative h-[calc(100vh+12rem)]">
        <Vortex
          backgroundColor="black"
          particleCount={500}
          rangeY={800}
          baseHue={180}
          baseSpeed={0.2}
          rangeSpeed={2}
          containerClassName="absolute inset-0"
        />
        
        <main className="relative z-10 container mx-auto px-4 pt-24" id="home">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-6 text-white">
              Share Files with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"> Cosmic</span> Speed
            </h1>
            
            <p className="text-xl text-center mb-12 text-white opacity-70">
              Upload files securely and share them with expiring links. Simple, fast, and reliable.
            </p>

            <div className="space-y-6 p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
              <FileUpload onFileSelect={setFile} selectedFile={file} />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white">Link Expiration</label>
                <DurationSelect value={duration} onChange={setDuration} />
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || !file || !duration}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white"
              >
                {isUploading ? 'Uploading...' : 'Generate Share Link'}
              </button>

              {error && (
                <div className="p-4 rounded-lg bg-red-500/20 text-red-200 text-sm">
                  {error}
                </div>
              )}

              {shareUrl && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">Share Link</label>
                  <ShareLink url={shareUrl} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {isUploading && (
        <MultiStepLoader steps={loadingStates} activeStep={activeStep} />
      )}

      <Footer />
    </div>
  );
}