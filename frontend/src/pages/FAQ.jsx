import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const faqs = [
    {
      question: language === 'fr' 
        ? 'Comment puis-je créer un CV ?' 
        : 'How can I create a CV?',
      answer: language === 'fr'
        ? 'Vous pouvez créer un CV en choisissant un modèle, en remplissant vos informations et en le téléchargeant au format PDF.'
        : 'You can create a CV by choosing a template, filling in your information, and downloading it as a PDF.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je modifier mon CV après l\'avoir créé ?' 
        : 'Can I edit my CV after creating it?',
      answer: language === 'fr'
        ? 'Oui, créez un compte pour sauvegarder votre CV et y revenir pour le modifier quand vous le souhaitez.'
        : 'Yes, create an account to save your CV and come back to edit it whenever you want.'
    },
    {
      question: language === 'fr' 
        ? 'Les modèles sont-ils gratuits ?' 
        : 'Are the templates free?',
      answer: language === 'fr'
        ? 'Oui, tous les modèles de base sont gratuits. Des modèles premium peuvent être disponibles avec un compte premium.'
        : 'Yes, all basic templates are free. Premium templates may be available with a premium account.'
    },
    {
      question: language === 'fr' 
        ? 'Dans quel format puis-je télécharger mon CV ?' 
        : 'In what format can I download my CV?',
      answer: language === 'fr'
        ? 'Vous pouvez télécharger votre CV au format PDF, qui est universellement accepté par les recruteurs.'
        : 'You can download your CV in PDF format, which is universally accepted by recruiters.'
    },
    {
      question: language === 'fr' 
        ? 'Comment puis-je supprimer mon compte ?' 
        : 'How can I delete my account?',
      answer: language === 'fr'
        ? 'Vous pouvez supprimer votre compte dans les paramètres de votre profil. Cette action est irréversible.'
        : 'You can delete your account in your profile settings. This action is irreversible.'
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        <div className={`py-12 ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900 to-indigo-900' : 'bg-gradient-to-br from-cvfacile-primary to-cvfacile-accent'}`}>
          <div className="container px-4 mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
            </h1>
            <p className="mt-4 text-xl text-white/90">
              {language === 'fr'
                ? 'Trouvez des réponses aux questions les plus courantes.'
                : 'Find answers to the most common questions.'}
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
