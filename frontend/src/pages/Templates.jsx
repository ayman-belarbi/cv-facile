import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Templates = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleTemplateSelect = async (template) => {
    try {
      setLoading(true);
      // Navigate to build page with template info
      navigate('/build', { 
        state: { 
          selectedTemplate: template.toLowerCase(),
          from: 'templates'
        }
      });
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = t('title.templates');
  }, [t]);

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        <section className={`py-12 md:py-16 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
          <div className="container px-4 mx-auto">
            <h2 className={`text-2xl md:text-3xl font-bold text-center font-poppins ${theme === 'dark' ? 'text-white' : ''}`}>
              {language === 'fr' ? 'Choisissez votre' : 'Choose your'} <span className={theme === 'dark' ? 'dark-text-gradient-primary' : 'text-gradient-primary'}>
                {language === 'fr' ? 'modèle de CV' : 'CV template'}
              </span>
            </h2>
          </div>
        </section>

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
                      disabled={loading}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white'
                          : 'bg-cvfacile-primary/10 hover:bg-cvfacile-primary text-cvfacile-primary hover:text-white'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        language === 'fr' ? 'Utiliser' : 'Use'
                      )}
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
