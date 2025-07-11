import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  sections: Array<{ id: string; title: string; slug: string }>;
}

const Header: React.FC<HeaderProps> = ({ sections }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.slug);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.slug);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (slug: string) => {
    const el = document.getElementById(slug);
    el?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ---------- Logo + Titre ---------- */}
          <button
            aria-label="Accueil"
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => scrollToSection(sections[0]?.slug || '')}
          >
            <img
              src="/img/blacklogovinz.png"
              alt="Logo Vincent"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-900">Vinzverse</span>
          </button>

          {/* ---------- Menu Desktop ---------- */}
          <nav className="hidden md:flex items-center space-x-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.slug)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  activeSection === section.slug
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {section.title}
              </button>
            ))}
            <a
              href="/moncv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors shadow"
            >
              Voir mon CV
            </a>
          </nav>

          {/* ---------- Menu mobile ---------- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Ouvrir le menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ---------- Navigation Mobile ---------- */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.slug)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    activeSection === section.slug
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
              <a
                href="/moncv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center mt-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium py-2 rounded shadow"
              >
                Voir mon CV
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
