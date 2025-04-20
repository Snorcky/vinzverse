import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useSectionWithContent } from '../../hooks/useData';
import { BriefcaseIcon } from 'lucide-react';

export const Experience: React.FC = () => {
  const { section, loading, error } = useSectionWithContent('experience');
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
        staggerChildren: 0.2
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

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-12"></div>
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
    <section id="experience" className="py-20" ref={ref}>
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
          className="max-w-3xl mx-auto"
        >
          <div className="relative border-l-2 border-blue-500 pl-8 ml-4">
            {section.contentBlocks?.map((block, index) => (
              <motion.div 
                key={block.id}
                variants={itemVariants}
                className="mb-12 relative"
              >
                {/* Timeline dot */}
                <div className="absolute w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center -left-13 mt-1.5 shadow-md" style={{ left: '-29px' }}>
                  <BriefcaseIcon className="h-5 w-5 text-white" />
                </div>
                
                {/* Content */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {block.title}
                    </h3>
                    <div className="text-sm text-gray-500">
                      {block.start_date} {block.end_date ? `- ${block.end_date}` : '- Présent'}
                    </div>
                  </div>
                  
                  <div 
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};