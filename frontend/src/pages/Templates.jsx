import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Loader2, Star, Layout, Sparkles, Briefcase, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const templateRankings = {
  "Software Development": {
    label: {
      en: "Software Development",
      fr: "Développement Logiciel"
    },
    recommendations: [
      {
        template: "Modern",
        reason: {
          en: "Clean layout perfect for showcasing technical skills",
          fr: "Mise en page épurée parfaite pour mettre en valeur les compétences techniques"
        }
      },
      {
        template: "Creative",
        reason: {
          en: "Great for full-stack and creative developers",
          fr: "Idéal pour les développeurs full-stack et créatifs"
        }
      },
      {
        template: "Classic",
        reason: {
          en: "Traditional format suitable for enterprise roles",
          fr: "Format traditionnel adapté aux rôles en entreprise"
        }
      }
    ]
  },
  "Design": {
    label: {
      en: "Design",
      fr: "Design"
    },
    recommendations: [
      {
        template: "Creative",
        reason: {
          en: "Perfect for showcasing creativity and design skills",
          fr: "Parfait pour mettre en valeur la créativité et les compétences en design"
        }
      },
      {
        template: "Modern",
        reason: {
          en: "Clean aesthetic that highlights visual work",
          fr: "Esthétique épurée qui met en valeur le travail visuel"
        }
      }
    ]
  },
  "Marketing": {
    label: {
      en: "Marketing",
      fr: "Marketing"
    },
    recommendations: [
      {
        template: "Modern",
        reason: {
          en: "Contemporary look that shows market awareness",
          fr: "Look contemporain qui démontre une conscience du marché"
        }
      },
      {
        template: "Creative",
        reason: {
          en: "Great for digital marketing and creative roles",
          fr: "Idéal pour le marketing digital et les rôles créatifs"
        }
      },
      {
        template: "Classic",
        reason: {
          en: "Suitable for traditional marketing positions",
          fr: "Adapté aux postes de marketing traditionnel"
        }
      }
    ]
  },
  "Project Management": {
    label: {
      en: "Project Management",
      fr: "Gestion de Projet"
    },
    recommendations: [
      {
        template: "Classic",
        reason: {
          en: "Professional layout that emphasizes experience",
          fr: "Mise en page professionnelle qui met l'accent sur l'expérience"
        }
      },
      {
        template: "Modern",
        reason: {
          en: "Clean design that highlights organizational skills",
          fr: "Design épuré qui souligne les compétences organisationnelles"
        }
      }
    ]
  },
  "Data Science": {
    label: {
      en: "Data Science",
      fr: "Science des Données"
    },
    recommendations: [
      {
        template: "Modern",
        reason: {
          en: "Clean layout ideal for technical expertise",
          fr: "Mise en page épurée idéale pour l'expertise technique"
        }
      },
      {
        template: "Classic",
        reason: {
          en: "Traditional format good for research positions",
          fr: "Format traditionnel adapté aux postes de recherche"
        }
      }
    ]
  },
  "Finance": {
    label: {
      en: "Finance",
      fr: "Finance"
    },
    recommendations: [
      {
        template: "Classic",
        reason: {
          en: "Traditional layout preferred in finance",
          fr: "Mise en page traditionnelle privilégiée en finance"
        }
      },
      {
        template: "Modern",
        reason: {
          en: "Contemporary look for fintech and modern firms",
          fr: "Look contemporain pour les entreprises fintech et modernes"
        }
      }
    ]
  }
};

const templates = [
  { 
    id: "Classic", 
    name: { en: 'Classic', fr: 'Classique' },
    icon: Layout,
    description: { en: 'Traditional style', fr: 'Style traditionnel' }
  },
  { 
    id: "Modern", 
    name: { en: 'Modern', fr: 'Moderne' },
    icon: Sparkles,
    description: { en: 'Contemporary design', fr: 'Design contemporain' }
  },
  { 
    id: "Creative", 
    name: { en: 'Creative', fr: 'Créatif' },
    icon: Briefcase,
    description: { en: 'Unique style', fr: 'Style unique' }
  },
  { 
    id: "Medical", 
    name: { en: 'Medical', fr: 'Médical' },
    icon: Stethoscope,
    description: { en: 'Medical format', fr: 'Format médical' }
  }
];

const Templates = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = async (template) => {
    try {
      setLoading(true);
      setSelectedTemplate(template);
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
    document.title = language === 'fr' ? 'Modèles de CV' : 'CV Templates';
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center font-poppins dark:text-white">
              {language === 'fr' ? 'Choisissez votre modèle de CV' : 'Choose your CV template'}
            </h2>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {language === 'fr' 
                ? 'Des modèles professionnels adaptés à votre domaine.' 
                : 'Professional templates tailored to your field.'}
            </p>
          </div>
        </section>

        <div className="container px-4 mx-auto mb-12">
          <h3 className="text-xl font-semibold mb-6 text-center">
            {language === 'fr' ? 'Modèles recommandés par domaine' : 'Recommended templates by field'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(templateRankings).map(([field, data]) => (
              <div 
                key={field}
                className="group relative rounded-lg overflow-hidden transition-all duration-300 border
                         bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm 
                         hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium">
                      {data.label[language]}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {(() => {
                      const rec = data.recommendations[0];
                      const template = templates.find(t => t.id === rec.template);
                      const Icon = template?.icon;
                      
                      return (
                        <div key={rec.template} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className="w-4 h-4" />}
                            <span className="text-sm">{template?.name[language]}</span>
                            <div className="flex items-center gap-1 ml-2">
                              <Star className="w-3 h-3 text-yellow-500" />
                            </div>
                          </div>
                          <button
                            onClick={() => handleTemplateSelect(rec.template)}
                            disabled={loading}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 
                                     bg-cvfacile-primary text-white dark:bg-blue-600 dark:hover:bg-blue-700 
                                     ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {loading && selectedTemplate === rec.template ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              language === 'fr' ? 'Utiliser' : 'Use'
                            )}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center">
            {language === 'fr' ? 'Tous les modèles' : 'All Templates'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="group relative rounded-lg overflow-hidden transition-all duration-300 border
                         bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm 
                         hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">
                      {template.name[language]}
                    </h3>
                    <button
                      onClick={() => handleTemplateSelect(template.id)}
                      disabled={loading}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 
                               bg-cvfacile-primary text-white dark:bg-blue-600 
                               ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading && selectedTemplate === template.id ? (
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
