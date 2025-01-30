/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Vortex } from '@/components/ui/vortex';
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from '@/lib/constants';
import { IconRocket, IconShieldLock, IconClock, IconFiles } from '@tabler/icons-react';

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="space-y-8 p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-white/10 rounded w-1/4"></div>
      <div className="h-20 bg-white/10 rounded"></div>
      <div className="grid md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-white/10 rounded"></div>
        ))}
      </div>
      <div className="h-8 bg-white/10 rounded w-1/3"></div>
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 bg-white/10 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

// Feature card component
const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="p-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
  >
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
        <Icon className="w-6 h-6 text-cyan-400" />
      </div>
      <div>
        <h3 className="font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function About(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="relative min-h-screen">
        <Vortex
          backgroundColor="black"
          particleCount={300}
          rangeY={800}
          baseHue={200}
          baseSpeed={0.15}
          rangeSpeed={1.5}
          containerClassName="absolute inset-0"
        />
        
        <main className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-center mb-8 text-white">
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"> CosmicShare</span>
            </h1>
            
            {isLoading ? <SkeletonLoader /> : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 p-8 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 text-white/80"
              >
                <motion.section variants={itemVariants} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
                  <p className="leading-relaxed">
                    CosmicShare was born from a vision to make file sharing as vast and seamless as the cosmos itself. 
                    We provide a secure, efficient, and user-friendly platform for sharing files with automatic expiration 
                    functionality, ensuring your data remains as controlled as a well-planned space mission.
                  </p>
                </motion.section>

                <motion.section variants={itemVariants} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FeatureCard 
                      icon={IconShieldLock}
                      title="Secure Sharing"
                      description="End-to-end file transfer with expiring links for enhanced security"
                    />
                    <FeatureCard 
                      icon={IconClock}
                      title="Auto-Cleanup"
                      description="Automatic file deletion after expiration to maintain privacy"
                    />
                    <FeatureCard 
                      icon={IconRocket}
                      title="Flexible Duration"
                      description="Choose expiration times from 30 seconds to 1 week"
                    />
                    <FeatureCard 
                      icon={IconFiles}
                      title="Wide Compatibility"
                      description="Support for various file formats up to 50MB"
                    />
                  </div>
                </motion.section>

                <motion.section variants={itemVariants} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">Technical Specifications</h2>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p><strong className="text-cyan-400">Maximum File Size:</strong> {(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p><strong className="text-cyan-400">Supported Formats:</strong> {ALLOWED_EXTENSIONS.join(', ')}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p><strong className="text-cyan-400">Frontend Stack:</strong> Next.js, React, TypeScript, Tailwind CSS</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <p><strong className="text-cyan-400">Backend Stack:</strong> FastAPI, Python, Appwrite Storage</p>
                    </div>
                  </div>
                </motion.section>

                <motion.section variants={itemVariants} className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">Privacy & Security</h2>
                  <div className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <p className="leading-relaxed">
                      Your privacy is our top priority. Files are automatically deleted after their expiration time, 
                      leaving no trace behind. We don&apos;t store any personal data, and all file transfers are handled 
                      with industry-standard security practices.
                    </p>
                  </div>
                </motion.section>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
}