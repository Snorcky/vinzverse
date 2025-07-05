import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: "Growth Marketer",
      company: "Woodbrass",
      location: "Montpellier",
      period: "2022 - 2024",
      description: "Optimisation des campagnes d'acquisition client, développement de stratégies de croissance multi-canal et analyse des performances ROI.",
      achievements: [
        "Augmentation de 40% du taux de conversion",
        "Réduction de 25% du coût d'acquisition client",
        "Mise en place d'un système d'A/B testing"
      ]
    },
    {
      id: 2,
      title: "Marketing Digital",
      company: "Basilic&Co",
      location: "Lyon",
      period: "2020 - 2022",
      description: "Gestion des campagnes SEA/SEO, création de contenus engageants et développement de l'écosystème digital de la marque.",
      achievements: [
        "Croissance de 60% du trafic organique",
        "Lancement de 3 nouvelles campagnes digitales",
        "Optimisation du tunnel de conversion"
      ]
    },
    {
      id: 3,
      title: "Développeur Web",
      company: "Freelance",
      location: "Remote",
      period: "2018 - 2020",
      description: "Développement d'applications web modernes, sites e-commerce et solutions sur mesure pour diverses entreprises.",
      achievements: [
        "15+ projets web livrés",
        "Intégration de systèmes de paiement",
        "Optimisation des performances"
      ]
    }
  ];

  return (
    <section id="mes-experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes Expériences
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un parcours riche combinant marketing digital et développement web
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`flex flex-col lg:flex-row items-start gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="lg:w-1/3">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center text-blue-600 mb-2">
                    <Calendar size={18} className="mr-2" />
                    <span className="font-semibold">{exp.period}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={18} className="mr-2" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      {exp.company}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <div className="bg-gray-50 p-8 rounded-lg">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Réalisations clés :
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;