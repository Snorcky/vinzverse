import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  // Parallax effect on scroll
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=1920')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Parallax overlay with slight movement */}
      <div 
        className="absolute inset-0 bg-black/60"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Mon Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Développeur passionné, créateur d'expériences numériques uniques et solutions innovantes
          </p>
          <a 
            href="#about" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Découvrir mon travail
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>
    </section>
  );
};