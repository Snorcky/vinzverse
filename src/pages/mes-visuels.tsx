import React, { useState, useEffect } from 'react';
import { Home, X, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

interface Visuel {
  id: number;
  title: string;
  description: string;
  images: string[];
}

const MesVisuels: React.FC = () => {
  const [selectedVisuel, setSelectedVisuel] = useState<Visuel | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const visuels: Visuel[] = [
    {
      id: 1,
      title: "Affiche promotionnelle",
      description: "Affiche réalisée pour promouvoir un concert à Basilic & Co de Saint-Herblain",
      images: ["/img/visuels/afficheconcert.png"]
    },
    {
      id: 2,
      title: "Flyer promotionnel",
      description: "Flyer distribué aux clients pour promouvoir un concert à Basilic & Co de Saint-Herblain",
      images: ["/img/visuels/flyerconcert.png"]
    },
    {
      id: 3,
      title: "Promotion Webinaire",
      description: "Création d'un visuel pour promouvoir un webinaire sur LinkedIn",
      images: ["/img/visuels/webinaire.png"]
    },
    {
      id: 4,
      title: "Visuel pour Instagram",
      description: "Exemple de visuel destiné à Instagram pour un exercice",
      images: ["/img/visuels/checklistcb.png"]
    },
    {
      id: 5,
      title: "Visuels Meta Ads",
      description: "Différents visuels pour une campagne meta ads",
      images: [
        "/img/visuels/ledium/1.png",
        "/img/visuels/ledium/2.png",
        "/img/visuels/ledium/3.png",
        "/img/visuels/ledium/4.png",
        "/img/visuels/ledium/5.png"
      ]
    },
    {
      id: 6,
      title: "Visuels fond d'écran animé",
      description: "Création de visuels pour la vente de fonds d'écran animés",
      images: [
        "/img/visuels/turazing/fd1.png",
        "/img/visuels/turazing/fd2.png",
        "/img/visuels/turazing/fd3.png",
        "/img/visuels/turazing/fd4.png",
        "/img/visuels/turazing/fd5.png",
        "/img/visuels/turazing/fd6.png",
        "/img/visuels/turazing/fd7.png"
      ]
    }
  ];

  const openLightbox = (visuel: Visuel) => {
    setSelectedVisuel(visuel);
    setCurrentIndex(0);  // important ici
  };

  const nextImage = () => {
    if (selectedVisuel) {
      setCurrentIndex((prev) =>
        (prev + 1) % selectedVisuel.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedVisuel) {
      setCurrentIndex((prev) =>
        prev === 0 ? selectedVisuel.images.length - 1 : prev - 1
      );
    }
  };

  // gestion des flèches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedVisuel) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedVisuel(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVisuel, currentIndex]);

  return (
    <section className="bg-white text-gray-900">
      {/* HEADER */}
      <div className="bg-gray-100 border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            <span className="font-medium">Retour au site</span>
          </a>
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold">Mes Visuels & Graphismes</h2>
            <p className="text-gray-600 text-base mt-1">
              Découvrez quelques-unes de mes créations graphiques et visuellessssss.
            </p>
          </div>
          <div className="w-36" />
        </div>
      </div>

      {/* CONTENU */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {visuels.map((visuel) => (
            <div
              key={visuel.id}
              className="rounded-lg shadow-lg overflow-hidden bg-gray-100 cursor-pointer group relative"
              onClick={() => openLightbox(visuel)}
            >
              <div className="relative w-full pb-[56.25%] bg-gray-200">
                <img
                  src={visuel.images[0]}
                  alt={visuel.title}
                  className="absolute top-0 left-0 w-full h-full object-contain rounded-t-lg group-hover:opacity-80 transition-opacity"
                />
                {visuel.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
                    <Layers className="w-4 h-4 text-gray-700" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{visuel.title}</h3>
                <p className="text-gray-700">{visuel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedVisuel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedVisuel(null)}
        >
          <div
            className="relative p-4 max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVisuel(null)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            >
              <X size={32} />
            </button>

            {selectedVisuel.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="
                    absolute left-4 top-1/2 transform -translate-y-1/2
                    bg-black bg-opacity-50 hover:bg-opacity-70 text-white
                    rounded-full p-2
                  "
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="
                    absolute right-4 top-1/2 transform -translate-y-1/2
                    bg-black bg-opacity-50 hover:bg-opacity-70 text-white
                    rounded-full p-2
                  "
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <img
              src={selectedVisuel.images[currentIndex]}
              alt={selectedVisuel.title}
              className="w-full max-h-[90vh] rounded-lg shadow-xl object-contain transition-transform duration-300"
            />
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-bold">{selectedVisuel.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MesVisuels;
