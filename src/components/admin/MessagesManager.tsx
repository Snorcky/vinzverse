import React, { useState, useEffect } from 'react';
import { Mail, MailOpen, Trash2, Eye, Calendar, User, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContactMessage } from '../../types';

const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: isRead })
        .eq('id', messageId);

      if (error) throw error;
      await fetchMessages();
      
      // Update selected message if it's the one being modified
      if (selectedMessage?.id === messageId) {
        setSelectedMessage({ ...selectedMessage, is_read: isRead });
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', messageId);

      if (error) throw error;
      await fetchMessages();
      
      // Close modal if deleted message was selected
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Erreur lors de la suppression du message');
    }
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if not already read
    if (!message.is_read) {
      await handleMarkAsRead(message.id, true);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'read') return message.is_read;
    if (filter === 'unread') return !message.is_read;
    return true;
  });

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages de contact</h1>
          <p className="text-gray-600 mt-1">
            {messages.length} message{messages.length > 1 ? 's' : ''} au total
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Non lus ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'read'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lus
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun message</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Aucun message de contact pour le moment.'
                : `Aucun message ${filter === 'read' ? 'lu' : 'non lu'}.`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                  !message.is_read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center">
                        {message.is_read ? (
                          <MailOpen size={20} className="text-gray-400" />
                        ) : (
                          <Mail size={20} className="text-blue-600" />
                        )}
                      </div>
                      <h3 className={`text-lg font-medium ${
                        !message.is_read ? 'text-gray-900 font-semibold' : 'text-gray-700'
                      }`}>
                        {message.subject}
                      </h3>
                      {!message.is_read && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Nouveau
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {message.name}
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-1" />
                        {message.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(message.created_at).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 line-clamp-2">
                      {message.message.length > 150 
                        ? `${message.message.substring(0, 150)}...`
                        : message.message
                      }
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(message.id, !message.is_read);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1"
                      title={message.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="text-red-600 hover:text-red-800 p-1"
                      title="Supprimer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {selectedMessage.name}
                    </div>
                    <div className="flex items-center">
                      <Mail size={16} className="mr-1" />
                      {selectedMessage.email}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar size={16} className="mr-1" />
                    {new Date(selectedMessage.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Message :</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage.id, !selectedMessage.is_read)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedMessage.is_read
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {selectedMessage.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Répondre par email
                  </a>
                </div>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;