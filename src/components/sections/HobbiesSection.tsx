import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Image, Music, Gamepad, Share2, Braces, ExternalLink } from 'lucide-react';

const HobbiesSection: React.FC = () => {
  const hobbies = [
    {
      id: 1,
      title: "Projets vidéos",
      icon: <Video size={32} className="text-blue-400" />,
      description: "Passionné par le montage vidéo et le monde de l'audiovisuel",
      image: "/img/projetvideo.jpg",
      link: "/mes-videos"
    },
    {
      id: 2,
      title: "Projets photo",
      icon: <Image size={32} className="text-blue-400" />,
      description: "Différentes créations visuelles réalisées pour de divers projets",
      image: "/img/projetphoto.jpg",
      link: "/mes-visuels"
    },
    {
      id: 3,
      title: "Développement Web",
      icon: <Braces size={32} className="text-blue-400" />,
      description: "Quelques projets de site web réalisés",
      image: "/img/devweb.jpg",
      link: "/projets-dev"
    },
    {
      id: 4,
      title: "Jeux Vidéo",
      icon: <Gamepad size={32} className="text-blue-400" />,
      description: "Ancien gamer, j'ai toujours une appétence pour ce monde-là ;)",
      image: "/img/setupgaming.jpg"
    },
    {
      id: 5,
      title: "Réseaux Sociaux",
      icon: <Share2 size={32} className="text-blue-400" />,
      description: "Instagram, TikTok, YouTube, SnapChat… Ce sont des réseaux que j'utilise souvent.",
      image: "/img/reseauxsociaux.jpg"
    },
    {
      id: 6,
      title: "Musique",
      icon: <Music size={32} className="text-blue-400" />,
      description: "Guitariste amateur, j'aime écouter de la musique, en jouer, en partager et en recevoir ;)",
      image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section id="mes-hobbies" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Mes projets & Hobbies</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Les passions qui nourrissent ma créativité et quelques projets réalisés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby) =>
            hobby.link ? (
              <Link
                to={hobby.link}
                key={hobby.id}
                className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 block"
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-48 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  {/* icone en bas à droite */}
                  <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
                    <ExternalLink size={16} className="text-gray-800" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {hobby.icon}
                    <h3 className="text-xl font-bold">{hobby.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{hobby.description}</p>
                </div>
              </Link>
            ) : (
              <div
                key={hobby.id}
                className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={hobby.image}
                    alt={hobby.title}
                    className="w-full h-48 object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {hobby.icon}
                    <h3 className="text-xl font-bold">{hobby.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{hobby.description}</p>
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ces passions enrichissent mon quotidien et stimulent ma créativité
            dans mes projets professionnels comme personnels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;
