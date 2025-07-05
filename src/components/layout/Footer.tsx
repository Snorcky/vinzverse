import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Mail size={18} />
              <span>gillaux.vincent@gmail.com</span>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-gray-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="#"
                className="hover:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
            </div>
          </div>

          {/* Admin Link */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Administration</h3>
            <a
              href="/admin"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Connexion administrateur
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © 2025 Vincent Gillaux. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;