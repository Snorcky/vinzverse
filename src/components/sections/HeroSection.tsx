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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
      {/* IMAGE DE FOND TECH */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
          alt="Fond tech marketing"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900/50 to-indigo-900/60 backdrop-blur-sm" />
      </div>

      {/* CONTENU HERO */}
      <div className="relative z-10 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 sm:p-10 shadow-2xl border border-white/10">
          <img
            src="/img/vincentg_pp.png"
            alt="Vincent"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full mx-auto mb-4 object-cover shadow-lg border-2 border-white/30 animate-pulse-smooth"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Vincent G.
          </h1>
          <p className="text-sm md:text-base text-blue-100 mb-4">
            Growth Hacker • Marketing Digital
          </p>
          <p className="text-base text-blue-200 leading-relaxed mb-6 max-w-lg mx-auto">
            Ancien développeur en reconversion Growth Hacker, je mixe stratégie marketing, créativité et compétences techniques pour générer des idées à fort impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToNextSection}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow"
            >
              Découvrir mon parcours
            </button>
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="border-2 border-blue-400 text-blue-200 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Me contacter
            </button>
          </div>
        </div>

        <div className="mt-10 animate-bounce">
          <ArrowDown size={24} className="mx-auto text-blue-400" />
        </div>
      </div>

      {/* Animation personnalisée */}
      <style>{`
        @keyframes pulseSmooth {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.95;
          }
        }
        .animate-pulse-smooth {
          animation: pulseSmooth 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
