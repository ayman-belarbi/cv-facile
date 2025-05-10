import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResumeData } from "@/lib/resumeData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { FileText, ArrowRight, Save } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { saveResume } from "@/services/resumeStorage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [resumeData, setResumeData] = useState(ResumeData);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  
  const isMobile = useMobile();
  const { isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Update resume language when app language changes
  useEffect(() => {
    updateResumeSettings({ language });
  }, [language]);

  const updateResumeSettings = (settings) => {
    setResumeData({
      ...resumeData,
      settings: {
        ...resumeData.settings,
        ...settings,
      },
    });
  };

  const handleSaveResume = () => {
    if (!isAuthenticated) {
      toast({
        title: language === 'fr' ? "Connexion requise" : "Login required",
        description: language === 'fr' 
          ? "Veuillez vous connecter pour sauvegarder votre CV" 
          : "Please log in to save your CV",
        variant: "destructive",
      });
      return;
    }

    if (!resumeTitle.trim()) {
      toast({
        title: language === 'fr' ? "Titre requis" : "Title required",
        description: language === 'fr' 
          ? "Veuillez donner un titre à votre CV" 
          : "Please give your CV a title",
        variant: "destructive",
      });
      return;
    }

    saveResume(resumeData, resumeTitle);
    setIsSaveDialogOpen(false);
    
    toast({
      title: language === 'fr' ? "CV sauvegardé" : "CV saved",
      description: language === 'fr' 
        ? "Votre CV a été sauvegardé avec succès, consultez votre tableau de bord" 
        : "Your CV has been successfully saved, check your dashboard",
    });
    
    // Navigate to dashboard after saving
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative py-16 md:py-20 overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-purple-900 to-indigo-900' 
            : 'bg-gradient-to-br from-cvfacile-primary to-cvfacile-accent'
        }`}>
          <div className="container px-4 mx-auto text-center">
            <h1 className="mb-6 text-3xl md:text-5xl font-bold text-white font-poppins">
              {t('app.subtitle')}
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-white/90">
              {language === 'fr' 
                ? 'CV Facile vous permet de créer, personnaliser et télécharger des CV professionnels au format PDF.'
                : 'Easy CV allows you to create, customize and download professional CVs in PDF format.'}
            </p>
            <a 
              href="#resume-builder" 
              className={`inline-flex items-center px-6 py-3 text-lg font-medium transition-all rounded-full shadow-lg ${
                theme === 'dark'
                  ? 'bg-white text-indigo-700 hover:bg-gray-100'
                  : 'bg-white text-cvfacile-primary hover:bg-gray-100'
              }`}
            >
              {isMobile ? t('app.create') : t('app.create.now')} <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
            <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-white"></div>
          </div>
        </section>
        
        {/* Feature Section */}
        <section className={`py-12 md:py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container px-4 mx-auto">
            <h2 className={`mb-10 md:mb-12 text-2xl md:text-3xl font-bold text-center font-poppins ${
              theme === 'dark' ? 'text-white' : ''
            }`}>
              {t('app.why.choose')} <span className={theme === 'dark' ? 'dark-text-gradient-primary' : 'text-gradient-primary'}>
                {language === 'fr' ? 'CV Facile' : 'Easy CV'}
              </span> ?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Feature cards */}
              {[
                {
                  title: t('app.prof.templates'),
                  description: language === 'fr'
                    ? "Choisissez parmi une sélection de modèles élégants et professionnels adaptés à votre secteur d'activité."
                    : "Choose from a selection of elegant and professional templates suited to your industry."
                },
                {
                  title: t('app.easy.custom'),
                  description: language === 'fr'
                    ? "Personnalisez les couleurs, les polices et la mise en page pour créer un CV qui vous ressemble."
                    : "Customize colors, fonts and layout to create a CV that looks like you."
                },
                {
                  title: t('app.pdf.export'),
                  description: language === 'fr'
                    ? "Téléchargez votre CV en format PDF de haute qualité, prêt à être partagé avec les recruteurs."
                    : "Download your CV in high quality PDF format, ready to be shared with recruiters."
                },
                {
                  title: t('app.intuitive.interface'),
                  description: language === 'fr'
                    ? "Notre interface conviviale vous guide à chaque étape de la création de votre CV."
                    : "Our user-friendly interface guides you through every step of creating your CV."
                },
                {
                  title: t('app.real.time.preview'),
                  description: language === 'fr'
                    ? "Visualisez les modifications apportées à votre CV en temps réel pour un résultat parfait."
                    : "See the changes made to your CV in real time for a perfect result."
                },
                {
                  title: t('app.secure.save'),
                  description: language === 'fr'
                    ? "Créez un compte pour sauvegarder vos CV et y accéder à tout moment depuis n'importe quel appareil."
                    : "Create an account to save your CVs and access them at any time from any device."
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`p-6 transition-all rounded-xl hover:shadow-lg ${
                    theme === 'dark' ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center ${
                    theme === 'dark'
                      ? (index % 2 === 0 ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-blue-600 to-teal-600')
                      : (index % 2 === 0 ? 'gradient-primary' : 'gradient-secondary')
                  }`}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold font-poppins">{feature.title}</h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Resume Builder Section */}
        <section id="resume-builder" className={`py-12 md:py-16 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
          <div className="container px-4 mx-auto">
            <h2 className={`mb-10 md:mb-12 text-2xl md:text-3xl font-bold text-center font-poppins ${theme === 'dark' ? 'text-white' : ''}`}>
              {t('app.build.prof.cv')} <span className={theme === 'dark' ? 'dark-text-gradient-primary' : 'text-gradient-primary'}>
                {language === 'fr' ? 'professionnel' : 'professional CV'}
              </span>
            </h2>
            
            <div className="flex justify-end mb-6">
              <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className={theme === 'dark' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-cvfacile-primary hover:bg-cvfacile-primary/90'}>
                    <Save className="w-4 h-4 mr-2" />
                    {t('app.save.cv')}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{language === 'fr' ? 'Sauvegarder votre CV' : 'Save your CV'}</DialogTitle>
                    <DialogDescription>
                      {language === 'fr' 
                        ? 'Donnez un titre à votre CV pour le retrouver facilement plus tard.'
                        : 'Give your CV a title to easily find it later.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="resume-title" className="text-right">
                        {language === 'fr' ? 'Titre' : 'Title'}
                      </Label>
                      <Input
                        id="resume-title"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveResume}>
                      {language === 'fr' ? 'Sauvegarder' : 'Save'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className={`mb-6 text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>
                  {t('app.information')}
                </h3>
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
              </div>
              
              <div>
                <h3 className={`mb-6 text-xl font-semibold ${theme === 'dark' ? 'text-white' : ''}`}>
                  {t('app.preview')}
                </h3>
                <ResumePreview data={resumeData} updateResumeSettings={updateResumeSettings} />
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Only show if not authenticated */}
        {!isAuthenticated && (
          <section className={`py-12 md:py-16 text-white ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
              : 'bg-gradient-to-br from-cvfacile-accent to-cvfacile-primary'
          }`}>
            <div className="container px-4 mx-auto text-center">
              <h2 className="mb-6 text-2xl md:text-4xl font-bold font-poppins">
                {t('app.boost.career')}
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl text-white/90">
                {language === 'fr'
                  ? 'Créez un compte gratuit pour sauvegarder vos CV, accéder à des modèles premium et partager vos réalisations.'
                  : 'Create a free account to save your CVs, access premium templates and share your achievements.'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/register"
                  className="px-6 py-3 text-lg font-medium transition-all bg-white rounded-full text-cvfacile-primary hover:bg-gray-100"
                >
                  {t('app.create.account')}
                </Link>
                <Link 
                  to="/"
                  className="px-6 py-3 text-lg font-medium transition-all border border-white rounded-full hover:bg-white/10"
                >
                  {t('app.learn.more')}
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
