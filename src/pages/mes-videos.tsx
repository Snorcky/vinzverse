import React from 'react';
import { Home } from 'lucide-react';

const MesVideos: React.FC = () => {
  const videos = [
    {
      id: 1,
      title: "Ma présentation en vidéo (Premiere Pro)",
      description: "Découvrez mon parcours en moins de 2 minutes ;)",
      embed: "https://www.youtube.com/embed/VA74yBFKWGg",
      type: "youtube"
    },
    {
      id: 2,
      title: "Compilation gaming (Premiere Pro)",
      description: "En tant que gamer forcément ...",
      embed: "https://www.youtube.com/embed/mKZSLQXXt8Y",
      type: "youtube"
    },
    {
      id: 3,
      title: "Basilic & Co (CapCut)",
      description: "Vidéo réalisée pour Basilic & Co",
      embed: "/videos/bnc.mp4",
      type: "local"
    },
    {
      id: 4,
      title: "FLDM ANGERS (Sony Vegas Pro)",
      description: "Vidéo réalisée pour la ville d'Angers afin de promouvoir la fête de la musique 2014-2015",
      embed: "/videos/fdlm_angers.mp4",
      type: "local"
    },
    {
      id: 5,
      title: "Intro Event FuzeIII",
      description: "Cette bande annonce avait pour but d'introduire un event sur Twitch pour la communauté de FuzeIII (Créateur de contenu sur Youtube)",
      embed: "/videos/BA_Event.mp4",
      type: "local"
    }
  ];

  return (
    <section className="bg-white text-gray-900">
      {/* HEADER SOFT */}
      <div className="bg-gray-100 border-b border-gray-200 py-8 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* bouton retour */}
          <a
            href="/"
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            <span className="font-medium">Retour au site</span>
          </a>

          {/* titre + description */}
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold">Mes Projets Vidéo</h2>
            <p className="text-gray-600 text-base mt-1">
              Découvrez quelques-unes de mes réalisations en audiovisuel et montage.
            </p>
          </div>

          {/* espace vide à droite pour équilibrer le justify-between */}
          <div className="w-36"></div>
        </div>
      </div>

      {/* CONTENU */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((video) => (
            <div
              key={video.id}
              className="rounded-lg shadow-lg overflow-hidden bg-gray-100"
            >
              <div className="relative w-full pb-[56.25%]">
                {video.type === "youtube" ? (
                  <iframe
                    src={video.embed}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                  ></iframe>
                ) : (
                  <video
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-t-lg"
                  >
                    <source src={video.embed} type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo HTML5.
                  </video>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-gray-700">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MesVideos;
