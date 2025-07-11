import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  return (
    <section id="mes-experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes Expériences
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un parcours riche alliant marketing digital, développement web et gestion d'équipe
          </p>
        </div>

        <div className="space-y-12">

          {/* Basilic&Co */}
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/3">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-semibold">2022 - 2024</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-2" />
                  <span>Saint-Herblain</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Manager</h3>
                  <p className="text-blue-600 font-semibold">Basilic&Co</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Management opérationnel d'une équipe en salle et en cuisine, application des normes qualité et sécurité, gestion de l’administratif et fidélisation de la clientèle.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Réalisations clés :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Encadrement d'une équipe de 6 personnes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Amélioration des process d’accueil client</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Suivi administratif complet de l'établissement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Assistant production / Community Manager */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:flex-row-reverse">
            <div className="lg:w-1/3">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-semibold">2021 - 2022</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-2" />
                  <span>Remote</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Assistant Production / Community Manager</h3>
                  <p className="text-blue-600 font-semibold">Indépendant</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Participation à la création de scripts vidéo, gestion de partenariats avec des marques, et optimisation de l’engagement communautaire pour un créateur de contenu.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Réalisations clés :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Rédaction de scripts engageants</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Gestion de collaborations avec des marques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Animation et modération de communauté</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Woodbrass */}
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/3">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center text-blue-600 mb-2">
                  <Calendar size={18} className="mr-2" />
                  <span className="font-semibold">2017 - 2021</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-2" />
                  <span>Saint-Herblain</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Développeur Full-Stack</h3>
                  <p className="text-blue-600 font-semibold">Woodbrass</p>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-8 rounded-lg">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Développement et maintenance des outils internes, du back-office et du site e-commerce woodbrass.com.
                </p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Réalisations clés :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Refonte de fonctionnalifffffffftés du back-office</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Support technique quotidien aux équipes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span><span className="text-gray-700">Contribution au maintien du site en production</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
