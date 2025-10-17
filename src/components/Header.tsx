import React, { useState } from 'react';
import { Menu, X, Heart, Upload, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: 'hero', icon: null },
    { name: 'About', href: 'about', icon: null },
    { name: 'Services', href: 'services', icon: null },
    { name: 'Upload', href: 'tools', icon: Upload },
    { name: 'Team', href: 'team', icon: null },
    { name: 'Contact', href: 'contact', icon: Phone },
  ];

  return (
    <header className="shadow-lg sticky top-0 z-50 border-b-2 border-red-600" style={{ backgroundColor: 'var(--color-cream-medium)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2"
          >
            <div className="bg-red-600 p-2 rounded-sm">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">HOSPEEZY</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-red-600 hover:bg-red-50"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Donate Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('donate')}
              className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Donate Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200" style={{ backgroundColor: 'var(--color-cream-medium)' }}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors text-gray-700 hover:text-red-600 hover:bg-red-50 w-full text-left"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('donate')}
              className="block w-full text-center bg-red-600 text-white px-3 py-2 rounded-md font-semibold mt-4"
            >
              Donate Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;