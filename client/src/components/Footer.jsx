import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+91 9596951004 ', href: 'tel:+919596951004' },
    { icon: Mail, text: 'jordanfitnessclub1@gmail.com', href: 'mailto:jordanfitnessclub1@gmail.com' },
    { icon: MapPin, text: 'Sarwan Singh market power house road, near jamia masjid, main bazar, Poonch, J and K 185101', href: 'https://maps.google.com' },
  ];

  const footerLinks = [
    { text: 'About Us', href: '/about' },
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Terms of Service', href: '/terms' },
    { text: 'Contact', href: '/contact' },
    { text: 'Careers', href: '/careers' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand and Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Jordan Fitness Club</h3>
            <p className="text-sm mb-4">
              Transform your body and mind with our premium fitness facilities and expert guidance.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 
                           transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors duration-200 
                             flex items-center gap-1 w-fit"
                  >
                    {link.text}
                    <ExternalLink className="w-3 h-3 opacity-75" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="flex items-center gap-2 hover:text-white 
                             transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <info.icon className="w-4 h-4" />
                    {info.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm border-t border-gray-800 pt-8">
          <p>© {new Date().getFullYear()} Jordan Fitness Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer
