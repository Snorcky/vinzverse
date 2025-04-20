import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useSectionWithContent } from '../../hooks/useData';

export const Skills: React.FC = () => {
  const { section, loading, error } = useSectionWithContent('skills');
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (width: number) => ({ 
      width: `${width}%`,
      transition: { duration: 1, ease: 'easeOut' }
    })
  };

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-12"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !section) {
    return null;
  }

  return (
    <section id="skills" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-4">
            {section.title}
          </motion.h2>
          {section.subtitle && (
            <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
              {section.subtitle}
            </motion.p>
          )}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8"
        >
          {section.contentBlocks?.map((block) => {
            // Extract skill percentage from content (assumed format: 85% or similar)
            const skillPercentage = parseInt(block.content.match(/\d+/)?.[0] || '75');
            
            return (
              <motion.div 
                key={block.id}
                variants={itemVariants}
                className="mb-6"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">{block.title}</span>
                  <span className="text-gray-600">{skillPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-blue-600 h-2.5 rounded-full"
                    custom={skillPercentage}
                    variants={progressVariants}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};