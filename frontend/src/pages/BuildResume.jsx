import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResumeData } from "@/lib/resumeData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { Save, FileDown } from "lucide-react";
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BuildResume = () => {
  const [resumeData, setResumeData] = useState(ResumeData);
  const [resumeTitle, setResumeTitle] = useState("");
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedTemplate = location.state?.selectedTemplate;

  // Update resume language when app language changes
  useEffect(() => {
    const currentLanguage = resumeData.settings.language;
    if (currentLanguage !== language) {
      setResumeData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          language
        }
      }));
    }
  }, [language]);

  // Update template if selected from templates page
  useEffect(() => {
    if (selectedTemplate) {
      setResumeData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          template: selectedTemplate,
        },
      }));
    }
  }, [selectedTemplate]);

  useEffect(() => {
    document.title = t('title.buildresume');
  }, [t]);

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

  const handleDownloadPDF = async () => {
    const resumeElement = document.getElementById('resume-preview').children[0];
    
    try {
      // Create canvas from the resume element
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Better quality
        useCORS: true, // For images
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Calculate dimensions (A4 size)
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
      );

      // Download the PDF
      const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_CV.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Une erreur s'est produite lors de la génération du PDF" 
          : "An error occurred while generating the PDF",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        <section className={`py-12 md:py-16 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
          <div className="container px-4 mx-auto">
            <h2 className={`mb-10 md:mb-12 text-2xl md:text-3xl font-bold text-center font-poppins ${theme === 'dark' ? 'text-white' : ''}`}>
              {t('app.build.prof.cv')} <span className={theme === 'dark' ? 'dark-text-gradient-primary' : 'text-gradient-primary'}>
                {language === 'fr' ? 'professionnel' : 'professional CV'}
              </span>
            </h2>
            
            <div className="flex justify-end mb-6 gap-2">
              <Button 
                onClick={handleDownloadPDF} 
                className={theme === 'dark' 
                  ? 'bg-emerald-600 hover:bg-emerald-600/90' 
                  : 'bg-emerald-500 hover:bg-emerald-500/90'
                }
              >
                <FileDown className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
              </Button>

              <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className={theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90' 
                    : 'bg-gradient-to-r from-cvfacile-primary to-cvfacile-accent hover:opacity-90'
                  }>
                    <Save className="w-4 h-4 mr-2" />
                    {isAuthenticated 
                      ? t('app.save.cv')
                      : language === 'fr' 
                        ? 'Connectez-vous pour sauvegarder'
                        : 'Login to save'
                    }
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
      </main>
      
      <Footer />
    </div>
  );
};

export default BuildResume; 