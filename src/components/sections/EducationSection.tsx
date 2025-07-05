import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection: React.FC = () => {
  const formations = [
    {
      id: 1,
      title: "Master Marketing Digital",
      school: "École Supérieure de Commerce",
      location: "Lyon",
      period: "2016 - 2018",
      description: "Spécialisation en marketing numérique, analytics et stratégies d'acquisition.",
      skills: ["Google Analytics", "SEO/SEA", "Marketing Automation", "Data Analysis"]
    },
    {
      id: 2,
      title: "Bachelor Informatique",
      school: "Université de Montpellier",
      location: "Montpellier",
      period: "2013 - 2016",
      description: "Formation en développement web, programmation et gestion de bases de données.",
      skills: ["JavaScript", "PHP", "MySQL", "HTML/CSS"]
    },
    {
      id: 3,
      title: "Certifications",
      school: "Diverses plateformes",
      location: "En ligne",
      period: "2018 - 2024",
      description: "Formation continue avec des certifications reconnues dans le domaine.",
      skills: ["Google Ads", "Facebook Blueprint", "HubSpot", "React.js"]
    }
  ];

  return (
    <section id="mes-formations" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Mes Formations
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Un apprentissage continu pour rester à la pointe des technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formations.map((formation) => (
            <div
              key={formation.id}
              className="bg-gray-900 rounded-lg p-8 hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="flex items-center mb-4">
                <GraduationCap size={32} className="text-blue-400 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">{formation.title}</h3>
                  <p className="text-blue-400 font-semibold">{formation.school}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-300 mb-2">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">{formation.period}</span>
              </div>

              <div className="flex items-center text-gray-300 mb-4">
                <Award size={16} className="mr-2" />
                <span className="text-sm">{formation.location}</span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {formation.description}
              </p>

              <div>
                <h4 className="font-semibold mb-3 text-blue-400">
                  Compétences acquises :
                </h4>
                <div className="flex flex-wrap gap-2">
                  {formation.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;