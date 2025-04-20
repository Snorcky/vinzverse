import React from 'react';
import { useNavigationItems } from '../hooks/useData';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navItems, loading } = useNavigationItems();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À Propos</h3>
            <p className="text-gray-300">
              Portfolio professionnel présentant mes compétences, expériences et projets. 
              N'hésitez pas à me contacter pour toute collaboration future.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            {!loading && (
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={item.url} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
              <li>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {year} Portfolio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};