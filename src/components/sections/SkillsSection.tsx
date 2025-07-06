import React from 'react';
import { Code, TrendingUp, Database, Palette, Users, BarChart3 } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      id: 1,
      title: "Marketing Digital",
      icon: <TrendingUp size={32} />,
      color: "bg-blue-500",
      skills: [
        { name: "SEO/SEA", level: 70 },
        { name: "Automatisation (Make, N8N)", level: 90 },
        { name: "Réflexion stratégique", level: 80 },
        { name: "A/B Testing", level: 80 },
        { name: "Campagne mailing", level: 70 },
        { name: "Scrapping & Enrichissement", level: 80 }
      ]
    },
    {
      id: 2,
      title: "Développement Web",
      icon: <Code size={32} />,
      color: "bg-green-500",
      skills: [
        { name: "JavaScript", level: 88 },
        { name: "CSS3", level: 85 },
        { name: "PHP", level: 80 },
        { name: "HTML/CSS", level: 95 },
        { name: "LUA", level: 65 },
        { name: "SQL", level: 95 }
      ]
    },
    {
      id: 3,
      title: "Data & Analytics",
      icon: <BarChart3 size={32} />,
      color: "bg-purple-500",
      skills: [
        { name: "Google Analytics", level: 60 },
        { name: "Google Tag Manager", level: 70 }
      ]
    },
    {
      id: 4,
      title: "Bases de Données",
      icon: <Database size={32} />,
      color: "bg-orange-500",
      skills: [
        { name: "MySQL", level: 82 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Supabase", level: 85 },
        { name: "Notion", level: 78 },
        { name: "Airtable", level: 75 },
      ]
    },
    {
      id: 5,
      title: "Créativité",
      icon: <Palette size={32} />,
      color: "bg-pink-500",
      skills: [
        { name: "Canva", level: 80 },
        { name: "Premiere Pro", level: 75 },
        { name: "CapCut", level: 100 },
        { name: "After Effect", level: 60 },
        { name: "Sony Vegas Pro", level: 80 }
      ]
    },
    {
      id: 6,
      title: "Autres",
      icon: <Users size={32} />,
      color: "bg-red-500",
      skills: [
        { name: "Wordpress", level: 80 },
        { name: "Prestashop", level: 70 },
        { name: "MAKE", level: 90 },
        { name: "N8N", level: 70 },
        { name: "DROPCONTACT", level: 70 }
      ]
    }
  ];

  return (
    <section id="mes-competences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mes Compétences
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une expertise technique et marketing pour créer des solutions complètes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`${category.color} p-3 rounded-lg text-white mr-4`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${category.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;