import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  const handleTemplateSelect = (template) => {
    navigate('/#resume-builder', { state: { selectedTemplate: template.toLowerCase() } });
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {['Classic', 'Modern', 'Creative', 'Medical'].map((template) => (
              <div 
                key={template}
                className={`group relative rounded-lg overflow-hidden transition-all duration-300 shadow-md ${
                  theme === 'dark' 
                    ? 'bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800' 
                    : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">
                      {language === 'fr' ? `Modèle ${template}` : `${template} Template`}
                    </h3>
                    <button
                      onClick={() => handleTemplateSelect(template)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white'
                          : 'bg-cvfacile-primary/10 hover:bg-cvfacile-primary text-cvfacile-primary hover:text-white'
                      }`}>
                      {language === 'fr' ? 'Utiliser' : 'Use'}
                    </button>
                  </div>
                </div>
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
