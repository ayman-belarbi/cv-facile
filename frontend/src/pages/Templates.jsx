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
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center font-poppins dark:text-white">
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
                className="group relative rounded-lg overflow-hidden transition-all duration-300 border
                           bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm 
                           hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">
                      {language === 'fr' ? `Modèle ${template}` : `${template} Template`}
                    </h3>
                    <button
                      onClick={() => handleTemplateSelect(template)}
                      disabled={loading}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 
                                 bg-cvfacile-primary text-white dark:bg-blue-600 
                                 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
