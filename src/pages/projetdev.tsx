import React, { useState } from 'react';
import { Home, X, Code, Github, Globe } from 'lucide-react';

interface Projet {
  id: number;
  title: string;
  description: string;
  image: string;
  stack: string[];
  repo?: string;
  url?: string;
}

const ProjetsDev: React.FC = () => {
  const [selectedProjet, setSelectedProjet] = useState<Projet | null>(null);

  const projets: Projet[] = [
    {
      id: 1,
      title: "Portfolio personnel",
      description: "Site personnel avec React, TypeScript et Tailwind",
      image: "/img/vinzverse.jpg",
      stack: ["React", "TypeScript", "Tailwind"],
      url: "https://vinzverse.com",
    },
    {
      id: 2,
      title: "Woodbrass.com",
      description: "Participation à la conception & maintenance du site",
      image: "/img/woodbrass.jpg",
      stack: ["PHP", "MySQL", "Gitlab","AngularJS","Javascript","HTML", "CSS"],
      url: "https://www.woodbrass.com"
    },
    {
      id: 3,
      title: "Machine à pub",
      description: "Développement & Refonte graphique du site machineapub.com",
      image: "/img/machineapub.jpg",
      stack: ["Prestashop", "Photoshop", "CSS", "HTML"],
      url: "https://www.machineapub.com"
    },
  ];

  return (
    <section className="bg-white text-gray-900 min-h-screen">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-8 px-4 sm:px-6 lg:px-8 shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-white">
          <a
            href="/"
            className="flex items-center hover:text-gray-200 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            <span className="font-medium">Retour au site</span>
          </a>
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold">Mes Projets de Développement</h2>
            <p className="text-base mt-1">
              Applications web et outils réalisés en autonomie
            </p>
          </div>
          <div className="w-36" />
        </div>
      </div>

      {/* CONTENU */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projets.map((projet) => (
            <div
              key={projet.id}
              className="rounded-lg shadow-lg overflow-hidden bg-gray-50 cursor-pointer group relative hover:scale-105 transition-transform"
              onClick={() => setSelectedProjet(projet)}
            >
              <div className="relative w-full pb-[56.25%] bg-gray-200">
                <img
                  src={projet.image}
                  alt={projet.title}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-2">
                  {projet.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-500" />
                  {projet.title}
                </h3>
                <p className="text-gray-700">{projet.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedProjet && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedProjet(null)}
        >
          <div
            className="relative p-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProjet(null)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedProjet.image}
              alt={selectedProjet.title}
              className="w-full max-h-[90vh] rounded-lg shadow-xl object-contain"
            />
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-bold">{selectedProjet.title}</h3>
              <p className="text-sm mt-2">{selectedProjet.description}</p>
              <div className="flex justify-center gap-3 mt-4 flex-wrap">
                {selectedProjet.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-3 mt-4 flex-wrap">
                {selectedProjet.repo && (
                  <a
                    href={selectedProjet.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-white text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Github size={16} />
                    Voir le code
                  </a>
                )}
                {selectedProjet.url && (
                  <a
                    href={selectedProjet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-white text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <Globe size={16} />
                    Voir le site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjetsDev;
