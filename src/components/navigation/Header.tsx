import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useNavigationItems } from '../../hooks/useData';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { navItems, loading } = useNavigationItems();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold">
            <a 
              href="#home" 
              className={`transition-colors ${isScrolled ? 'text-blue-600' : 'text-white'}`}
            >
              Portfolio
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {!loading && navItems.map((item) => (
              <a 
                key={item.id} 
                href={item.url}
                className={`font-medium hover:text-blue-500 transition-colors ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {isAuthenticated && (
              <Link to="/admin" className="font-medium text-blue-600 hover:text-blue-700">
                Admin
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            {!loading && navItems.map((item) => (
              <a 
                key={item.id} 
                href={item.url}
                className="block font-medium text-gray-700 hover:text-blue-500 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {isAuthenticated && (
              <Link 
                to="/admin" 
                className="block font-medium text-blue-600 hover:text-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};