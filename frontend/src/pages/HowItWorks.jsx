import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText, Edit, Download, Save } from 'lucide-react';

const HowItWorks = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();

  const steps = [
    {
      icon: FileText,
      title: language === 'fr' ? 'Choisissez un modèle' : 'Choose a template',
      description: language === 'fr'
        ? 'Sélectionnez un modèle de CV parmi notre collection de designs professionnels.'
        : 'Select a CV template from our collection of professional designs.'
    },
    {
      icon: Edit,
      title: language === 'fr' ? 'Remplissez vos informations' : 'Fill in your information',
      description: language === 'fr'
        ? 'Ajoutez vos coordonnées, expériences, compétences et formation avec notre éditeur simple.'
        : 'Add your contact details, experiences, skills, and education with our simple editor.'
    },
    {
      icon: Save,
      title: language === 'fr' ? 'Sauvegardez votre travail' : 'Save your work',
      description: language === 'fr'
        ? 'Créez un compte pour sauvegarder votre CV et y revenir plus tard pour le modifier.'
        : 'Create an account to save your CV and come back to it later for edits.'
    },
    {
      icon: Download,
      title: language === 'fr' ? 'Téléchargez votre CV' : 'Download your CV',
      description: language === 'fr'
        ? 'Téléchargez votre CV au format PDF prêt à être envoyé aux recruteurs.'
        : 'Download your CV as a PDF ready to be sent to recruiters.'
    }
  ];

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        <div className={`py-12 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900 to-indigo-900' : 'bg-gradient-to-br from-cvfacile-primary to-cvfacile-accent'}`}>
          <div className="container px-4 mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {language === 'fr' ? 'Comment ça marche' : 'How It Works'}
            </h1>
            <p className="mt-4 text-xl text-white/90">
              {language === 'fr'
                ? 'Créez votre CV professionnel en quelques minutes seulement.'
                : 'Create your professional CV in just a few minutes.'}
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}
              >
                <div className={`w-16 h-16 mb-6 rounded-full flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600' 
                    : 'gradient-primary'
                }`}>
                  <step.icon className="w-8 h-8 text-white" />
                  <div className="absolute w-6 h-6 -mt-2 -mr-2 text-sm font-bold bg-white rounded-full flex items-center justify-center text-cvfacile-primary">
                    {index + 1}
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  {step.description}
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

export default HowItWorks;
