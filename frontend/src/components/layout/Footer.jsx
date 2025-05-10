import React from 'react';
import { FileText } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-cvfacile-primary" />
              <span className="text-xl font-bold font-poppins text-gradient-primary">CV Facile</span>
            </div>
            <p className="text-sm text-gray-600">
              Créez, personnalisez et téléchargez des CV professionnels en quelques minutes.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Produit</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-cvfacile-primary">Modèles</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Tarifs</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Témoignages</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Ressources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-cvfacile-primary">Guide de rédaction</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Conseils d'entretien</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Blog</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase">Légal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-cvfacile-primary">Conditions d'utilisation</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-cvfacile-primary">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            &copy; {new Date().getFullYear()} CV Facile. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
