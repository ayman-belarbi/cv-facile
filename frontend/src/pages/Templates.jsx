import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Templates = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        <div className={`py-12 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900 to-indigo-900' : 'bg-gradient-to-br from-cvfacile-primary to-cvfacile-accent'}`}>
          <div className="container px-4 mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {language === 'fr' ? 'Modèles de CV' : 'CV Templates'}
            </h1>
            <p className="mt-4 text-xl text-white/90">
              {language === 'fr'
                ? 'Choisissez parmi notre collection de modèles professionnels.'
                : 'Choose from our collection of professional templates.'}
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {['Classic', 'Modern', 'Creative', 'Medical'].map((template) => (
              <div 
                key={template}
                className={`p-6 rounded-lg shadow-lg template-hover ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className={`h-64 flex items-center justify-center mb-4 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className={`text-xl font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {template}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  {language === 'fr' ? `Modèle ${template}` : `${template} Template`}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {language === 'fr'
                    ? `Un design ${template.toLowerCase()} pour votre CV professionnel.`
                    : `A ${template.toLowerCase()} design for your professional CV.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
