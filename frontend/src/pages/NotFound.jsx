import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = t('title.notfound');
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="text-center p-8 rounded-lg glass-card max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-gradient-primary dark:text-white">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {language === 'fr' ? 'Oups! Page introuvable' : 'Oops! Page not found'}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {language === 'fr' 
            ? 'La page que vous recherchez n\'existe pas ou a été déplacée.' 
            : 'The page you are looking for doesn\'t exist or has been moved.'}
        </p>
        <Button asChild className="bg-cvfacile-primary dark:bg-blue-600 hover:bg-cvfacile-primary/90 dark:hover:bg-blue-700">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {language === 'fr' ? 'Retour à l\'accueil' : 'Return to Home'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
