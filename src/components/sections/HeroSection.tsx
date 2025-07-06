import React from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('mes-experiences');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <img
            src="/img/vincentg_pp.png"
            alt="moi"
            className="w-40 h-40 rounded-full mx-auto mb-8 object-cover shadow-lg"
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Vincent G.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Growth Hacker / Marketing Digital
        </p>
        
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
        Ancien développeur, et actuellement en reconversion pour être Growth Hacker, je combine stratégie marketing et compétences
        techniques pour créer des solutions innovantes et performantes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={scrollToNextSection}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Découvrir mon parcours
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
          >
            Me contacter
          </button>
        </div>

        <div className="animate-bounce">
          <ArrowDown size={32} className="text-blue-600 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;