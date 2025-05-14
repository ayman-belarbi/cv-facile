import React from 'react';
import { FileUser, Github, Linkedin, Twitter, Mail, ArrowRight, Save } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const Footer = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const footerLinks = {
    quickLinks: {
      title: language === 'fr' ? 'Liens rapides' : 'Quick Links',
      links: [
        { href: '/templates', text: language === 'fr' ? 'Modèles' : 'Templates' },
        { href: '/build', text: language === 'fr' ? 'Créer un CV' : 'Create CV' },
        { 
          href: '#features', 
          text: language === 'fr' ? 'Fonctionnalités' : 'Features',
          onClick: () => handleScrollTo('features')
        },
        { 
          href: '#faqs', 
          text: language === 'fr' ? 'FAQ' : 'FAQ',
          onClick: () => handleScrollTo('faqs')
        }
      ]
    },
    help: {
      title: language === 'fr' ? 'Aide' : 'Help',
      links: [
        { 
          href: '#how-it-works', 
          text: language === 'fr' ? 'Comment ça marche' : 'How it works',
          onClick: () => handleScrollTo('how-it-works')
        },
        { 
          href: '#', 
          text: language === 'fr' ? 'Nous contacter' : 'Contact us'
        }
      ]
    },
    legal: {
      title: language === 'fr' ? 'Légal' : 'Legal',
      links: [
        { href: '#', text: language === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Use' },
        { href: '#', text: language === 'fr' ? 'Politique de confidentialité' : 'Privacy Policy' }
      ]
    }
  };

  const socialLinks = [
    { 
      href: '#', 
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub'
    },
    { 
      href: '#', 
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn'
    },
    { 
      href: '#', 
      icon: <Twitter className="w-5 h-5" />,
      label: 'Twitter'
    }
  ];

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t`}>
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        {/* Signup CTA Section */}
        {!isAuthenticated && (
          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-cvfacile-primary/10 to-cvfacile-accent/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'fr' ? 'Sauvegardez vos CV' : 'Save your CVs'}
                </h3>
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'fr' 
                    ? 'Créez un compte pour sauvegarder et gérer tous vos CV'
                    : 'Create an account to save and manage all your CVs'}
                </p>
              </div>
              <Button 
                asChild
                className={theme === 'dark' 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90' 
                  : 'bg-gradient-to-r from-cvfacile-primary to-cvfacile-accent hover:opacity-90'
                }
              >
                <Link to="/register">
                  <Save className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Créer un compte' : 'Sign up'}
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <FileUser className={`w-6 h-6 ${theme === 'dark' ? 'text-cvfacile-accent' : 'text-cvfacile-primary'}`} />
              <span className={`text-xl font-bold font-poppins ${theme === 'dark' ? 'text-white' : 'text-gradient-primary'}`}>
                {language === 'fr' ? 'CV Facile' : 'Easy CV'}
              </span>
            </Link>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' 
                ? 'Créez votre CV professionnel en quelques minutes. Des modèles modernes, une interface intuitive, et des conseils personnalisés pour vous démarquer.'
                : 'Create your professional CV in minutes. Modern templates, intuitive interface, and personalized tips to help you stand out.'}
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-cvfacile-primary hover:bg-gray-100'
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className={`mb-4 text-sm font-semibold uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {footerLinks.quickLinks.title}
            </h3>
            <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {footerLinks.quickLinks.links.map((link, index) => (
                <li key={index}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="hover:text-cvfacile-primary transition-colors inline-flex items-center gap-2"
                    >
                      {link.text}
                    </button>
                  ) : (
                    <Link 
                      to={link.href} 
                      className="hover:text-cvfacile-primary transition-colors inline-flex items-center gap-2"
                    >
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Help & Legal Combined */}
          <div>
            {/* Help Section */}
            <div className="mb-8">
              <h3 className={`mb-4 text-sm font-semibold uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {footerLinks.help.title}
              </h3>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {footerLinks.help.links.map((link, index) => (
                  <li key={index}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="hover:text-cvfacile-primary transition-colors inline-flex items-center gap-2"
                      >
                        {link.text}
                      </button>
                    ) : (
                      <Link 
                        to={link.href} 
                        className="hover:text-cvfacile-primary transition-colors inline-flex items-center gap-2"
                      >
                        {link.text}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className={`mb-4 text-sm font-semibold uppercase ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {footerLinks.legal.title}
              </h3>
              <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {footerLinks.legal.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href} 
                      className="hover:text-cvfacile-primary transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className={`pt-8 mt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} {language === 'fr' ? 'CV Facile' : 'Easy CV'}. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
