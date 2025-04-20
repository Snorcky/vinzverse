import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Menu, 
  Globe, 
  Settings, 
  MessageSquare, 
  LogOut, 
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="md:hidden mr-4 text-gray-600"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/admin" className="text-xl font-bold text-blue-600">
            Portfolio Admin
          </Link>
        </div>
        
        <div className="flex items-center">
          <div className="mr-2 text-sm text-gray-600">{user?.email}</div>
          <div className="relative">
            <button 
              className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold"
              aria-label="Profile menu"
            >
              {user?.email?.charAt(0)?.toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="absolute inset-0 bg-black/30"
              onClick={toggleSidebar}
              aria-hidden="true"
            />
            <div className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg">
              <div className="p-4 flex justify-between items-center border-b">
                <h2 className="font-semibold text-lg">Menu</h2>
                <button 
                  onClick={toggleSidebar}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={toggleSidebar}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/sections"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={toggleSidebar}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Sections
                </Link>
                <Link
                  to="/admin/navigation"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={toggleSidebar}
                >
                  <Globe className="h-5 w-5 mr-3" />
                  Navigation
                </Link>
                <Link
                  to="/admin/messages"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={toggleSidebar}
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Messages
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                  onClick={toggleSidebar}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Paramètres
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Déconnexion
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden md:block bg-white w-64 border-r overflow-y-auto">
          <nav className="p-4 space-y-1">
            <Link
              to="/admin"
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              to="/admin/sections"
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
            >
              <FileText className="h-5 w-5 mr-3" />
              Sections
            </Link>
            <Link
              to="/admin/navigation"
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
            >
              <Globe className="h-5 w-5 mr-3" />
              Navigation
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Messages
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
            >
              <Settings className="h-5 w-5 mr-3" />
              Paramètres
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};