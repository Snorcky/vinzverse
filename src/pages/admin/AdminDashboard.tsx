import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Globe, 
  MessageSquare, 
  Settings,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/sections">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-center mb-2">Sections</CardTitle>
              <p className="text-gray-600 text-center">
                Gérer les sections et leur contenu
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/navigation">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-center mb-2">Navigation</CardTitle>
              <p className="text-gray-600 text-center">
                Gérer les éléments du menu
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/messages">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-center mb-2">Messages</CardTitle>
              <p className="text-gray-600 text-center">
                Voir les messages du formulaire de contact
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/settings">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-center mb-2">Paramètres</CardTitle>
              <p className="text-gray-600 text-center">
                Gérer les paramètres du site
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Accès rapides</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <ul className="divide-y">
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 mr-3" />
                <span>Voir le site</span>
              </div>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Ouvrir
              </a>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-500 mr-3" />
                <span>Modifier la section À Propos</span>
              </div>
              <Link 
                to="/admin/sections/about" 
                className="text-blue-600 hover:text-blue-800"
              >
                Modifier
              </Link>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-gray-500 mr-3" />
                <span>Voir les nouveaux messages</span>
              </div>
              <Link 
                to="/admin/messages" 
                className="text-blue-600 hover:text-blue-800"
              >
                Voir
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};