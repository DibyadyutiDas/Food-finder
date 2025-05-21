import React from 'react';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Leaf className="w-7 h-7 text-green-400 mr-2" />
              <span className="text-xl font-bold text-white">Food Finder</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover the best vegetarian and Satvik restaurants near you.
              Our mission is to connect you with restaurants that align with your dietary preferences.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink label="Home" />
              <FooterLink label="About Us" />
              <FooterLink label="Find Restaurants" />
              <FooterLink label="Restaurant Owners" />
              <FooterLink label="Dietary Guidelines" />
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <FooterLink label="FAQs" />
              <FooterLink label="Privacy Policy" />
              <FooterLink label="Terms of Service" />
              <FooterLink label="Contact Us" />
              <FooterLink label="Report an Issue" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <ContactItem 
                icon={<MapPin size={18} />}
                text="123 Healthy Street, Green City, CA 90210"
              />
              <ContactItem 
                icon={<Phone size={18} />}
                text="+1 (555) 123-4567"
              />
              <ContactItem 
                icon={<Mail size={18} />}
                text="info@foodfinder.example.com"
              />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Food Finder. All rights reserved.
          </p>
          <div className="mt-3 md:mt-0 flex justify-center md:justify-end space-x-4">
            <span className="text-gray-400 text-sm">Privacy Policy</span>
            <span className="text-gray-400 text-sm">Terms of Service</span>
            <span className="text-gray-400 text-sm">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ label }) => {
  return (
    <li>
      <a
        href="#"
        className="text-gray-400 hover:text-green-400 transition-colors duration-200"
      >
        {label}
      </a>
    </li>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <a
      href="#"
      className="bg-gray-700 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
    >
      {icon}
    </a>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, text }) => {
  return (
    <li className="flex items-start">
      <span className="text-green-400 mr-3 mt-1">{icon}</span>
      <span className="text-gray-400">{text}</span>
    </li>
  );
};

export default Footer;