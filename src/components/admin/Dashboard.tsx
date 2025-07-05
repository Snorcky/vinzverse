import React, { useState, useEffect } from 'react';
import { FileText, Users, Mail, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState({
    sections: 0,
    users: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [sectionsRes, usersRes, messagesRes, unreadRes] = await Promise.all([
        supabase.from('menu_sections').select('*', { count: 'exact' }),
        userProfile?.role === 'admin' 
          ? supabase.from('users').select('*', { count: 'exact' })
          : Promise.resolve({ count: 0 }),
        supabase.from('contact_messages').select('*', { count: 'exact' }),
        supabase.from('contact_messages').select('*', { count: 'exact' }).eq('is_read', false),
      ]);

      setStats({
        sections: sectionsRes.count || 0,
        users: usersRes.count || 0,
        messages: messagesRes.count || 0,
        unreadMessages: unreadRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Sections',
      value: stats.sections,
      icon: FileText,
      color: 'bg-blue-500',
    },
    ...(userProfile?.role === 'admin' ? [{
      title: 'Utilisateurs',
      value: stats.users,
      icon: Users,
      color: 'bg-green-500',
    }] : []),
    {
      title: 'Messages',
      value: stats.messages,
      icon: Mail,
      color: 'bg-purple-500',
    },
    {
      title: 'Non lus',
      value: stats.unreadMessages,
      icon: Eye,
      color: 'bg-orange-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Tableau de bord
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${card.color} p-3 rounded-lg text-white mr-4`}>
                <card.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Actions rapides
          </h2>
          <div className="space-y-3">
            <a
              href="/admin/sections"
              className="block w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Gérer les sections
            </a>
            <a
              href="/admin/messages"
              className="block w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              Voir les messages
            </a>
            {userProfile?.role === 'admin' && (
              <a
                href="/admin/users"
                className="block w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
              >
                Gérer les utilisateurs
              </a>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informations système
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Votre rôle:</span>
              <span className="font-medium capitalize">{userProfile?.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dernière connexion:</span>
              <span className="font-medium">Aujourd'hui</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Statut:</span>
              <span className="font-medium text-green-600">Actif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;