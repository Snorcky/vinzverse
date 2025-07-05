import React from 'react';
import { Music, Camera, Bike, Book, Plane, Coffee } from 'lucide-react';

const HobbiesSection: React.FC = () => {
  const hobbies = [
    {
      id: 1,
      title: "Photographie",
      icon: <Camera size={48} />,
      description: "Passionné par la photographie de paysage et de rue, j'explore les jeux de lumière et les compositions créatives.",
      image: "https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Cyclisme",
      icon: <Bike size={48} />,
      description: "Amateur de cyclisme sur route et VTT, j'aime découvrir de nouveaux parcours et repousser mes limites.",
      image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Musique",
      icon: <Music size={48} />,
      description: "Guitariste amateur, j'apprécie autant jouer que découvrir de nouveaux artistes et styles musicaux.",
      image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      title: "Lecture",
      icon: <Book size={48} />,
      description: "Lecteur assidu de livres sur le développement personnel, la technologie et l'entrepreneuriat.",
      image: "https://images.pexels.com/photos/1370298/pexels-photo-1370298.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 5,
      title: "Voyages",
      icon: <Plane size={48} />,
      description: "Explorateur dans l'âme, j'aime découvrir de nouvelles cultures et m'inspirer de mes voyages.",
      image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 6,
      title: "Café de spécialité",
      icon: <Coffee size={48} />,
      description: "Amateur de café de spécialité, j'explore les différentes origines et méthodes de préparation.",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section id="mes-hobbies" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Mes Hobbies & Centres d'Intérêt
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Les passions qui nourrissent ma créativité et mon inspiration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hobbies.map((hobby) => (
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
                <div className="flex items-center mb-4">
                  <div className="text-blue-400 mr-4">
                    {hobby.icon}
                  </div>
                  <h3 className="text-xl font-bold">{hobby.title}</h3>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  {hobby.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ces activités enrichissent ma vision créative et m'aident à aborder 
            les défis professionnels avec une perspective unique et innovante.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;