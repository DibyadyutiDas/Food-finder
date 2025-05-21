import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, LogIn, MapPin } from 'lucide-react';
import Button from './ui/Button';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleNavigate('home')}
        >
          <Leaf 
            className={`w-8 h-8 ${isScrolled ? 'text-green-600' : 'text-green-500'} mr-2`} 
          />
          <span 
            className={`text-xl font-bold ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}
          >
            Food Finder
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <NavLink 
            label="Home" 
            isActive={currentPage === 'home'} 
            isScrolled={isScrolled} 
            onClick={() => handleNavigate('home')} 
          />
          <NavLink 
            label="About" 
            isActive={currentPage === 'about'} 
            isScrolled={isScrolled} 
            onClick={() => handleNavigate('about')} 
          />
          <NavLink 
            label="Favorites" 
            isActive={currentPage === 'favorites'} 
            isScrolled={isScrolled} 
            onClick={() => handleNavigate('favorites')} 
          />
          <Button 
            variant="outline"
            size="sm"
            leftIcon={<MapPin size={16} />}
            className={`${!isScrolled && 'text-white border-white hover:bg-white/20'}`}
            onClick={() => handleNavigate('map')}
          >
            Choose Location
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            leftIcon={<LogIn size={16} />}
          >
            Login
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <NavLinkMobile 
              label="Home" 
              isActive={currentPage === 'home'} 
              onClick={() => handleNavigate('home')} 
            />
            <NavLinkMobile 
              label="About" 
              isActive={currentPage === 'about'} 
              onClick={() => handleNavigate('about')} 
            />
            <NavLinkMobile 
              label="Favorites" 
              isActive={currentPage === 'favorites'} 
              onClick={() => handleNavigate('favorites')} 
            />
            <Button 
              variant="outline"
              size="sm"
              leftIcon={<MapPin size={16} />}
              fullWidth
              onClick={() => handleNavigate('map')}
            >
              Choose Location
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              leftIcon={<LogIn size={16} />}
              fullWidth
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  label: string;
  isActive: boolean;
  isScrolled: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, isActive, isScrolled, onClick }) => {
  return (
    <button
      className={`text-sm font-medium px-1 py-1 transition-all border-b-2 ${
        isActive 
          ? 'border-green-500' 
          : 'border-transparent hover:border-gray-300'
      } ${
        isScrolled ? 'text-gray-800' : 'text-white'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

interface NavLinkMobileProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLinkMobile: React.FC<NavLinkMobileProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`text-sm font-medium p-2 w-full text-left ${
        isActive 
          ? 'bg-green-50 text-green-700 font-semibold' 
          : 'text-gray-800 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Header;