import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ResumeData } from "@/lib/resumeData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { Save, FileDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { createResume, fetchResumeById, updateResume } from '@/services/resumeStorage';
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
  const [isEditMode, setIsEditMode] = useState(false);
  
  const { isAuthenticated, token } = useAuth();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const selectedTemplate = location.state?.selectedTemplate;

  // Check if we're in edit mode and fetch resume data
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      fetchResumeById(id, token)
        .then(resume => {
          setResumeData(typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data);
          setResumeTitle(resume.title);
        })
        .catch(() => {
          toast({
            title: language === 'fr' ? "Erreur" : "Error",
            description: language === 'fr' 
              ? "Impossible de charger le CV" 
              : "Could not load CV",
            variant: "destructive",
          });
          navigate('/dashboard');
        });
    }
  }, [id, token, language, navigate, toast]);

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

  const handleSaveResume = async () => {
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

    try {
      if (isEditMode) {
        await updateResume(id, { title: resumeTitle, data: resumeData }, token);
        toast({
          title: language === 'fr' ? "CV mis à jour" : "CV updated",
          description: language === 'fr' 
            ? "Votre CV a été mis à jour avec succès" 
            : "Your CV has been successfully updated",
        });
      } else {
        await createResume({ title: resumeTitle, data: resumeData }, token);
        toast({
          title: language === 'fr' ? "CV sauvegardé" : "CV saved",
          description: language === 'fr' 
            ? "Votre CV a été sauvegardé avec succès, consultez votre tableau de bord" 
            : "Your CV has been successfully saved, check your dashboard",
        });
      }
      setIsSaveDialogOpen(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' 
          ? "Échec de la sauvegarde du CV" 
          : "Failed to save CV",
        variant: "destructive",
      });
    }
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
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'dark:bg-slate-900 text-white' : 'bg-gray-50'}`}>
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center font-poppins dark:text-white">
              {language === 'fr' ? 'Créez votre CV' : 'Build your CV'}
            </h2>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              {language === 'fr' 
                ? 'Découvrez nos recommandations de modèles adaptés à votre domaine professionnel' 
                : 'Discover our template recommendations tailored to your professional field'}
            </p>
          </div>
        </section>
        
        <section className={`py-12 md:py-16 ${theme === 'dark' ? 'dark:bg-slate-900' : 'bg-gray-50'}`}>
          <div className="container px-4 mx-auto">
            <div className="flex justify-end mb-6 gap-2">
              <Button 
                onClick={handleDownloadPDF} 
                className={theme === 'dark' 
                  ? 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700' 
                  : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200'
                }
              >
                <FileDown className="w-4 h-4 mr-2" />
                {language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
              </Button>

              <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                <DialogTrigger asChild>
                  {isAuthenticated ? (
                    <Button
                      className={theme === 'dark' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 dark:border-blue-500' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700'
                      }
                      onClick={() => setIsSaveDialogOpen(true)}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isEditMode
                        ? (language === 'fr' ? 'Mettre à jour' : 'Update')
                        : (language === 'fr' ? 'Sauvegarder le CV' : 'Save CV')}
                    </Button>
                  ) : (
                    <Button
                      className={theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                      onClick={() => navigate('/login')}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Connectez-vous pour sauvegarder' : 'Login to save'}
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className={theme === 'dark' ? 'dark:text-white' : ''}>
                      {isEditMode
                        ? (language === 'fr' ? 'Mettre à jour' : 'Update')
                        : (language === 'fr' ? 'Sauvegarder votre CV' : 'Save your CV')}
                    </DialogTitle>
                    <DialogDescription className={theme === 'dark' ? 'dark:text-gray-300' : ''}>
                      {isEditMode
                        ? (language === 'fr'
                            ? 'Modifiez le titre de votre CV si nécessaire.'
                            : 'Edit your CV title if needed.')
                        : (language === 'fr'
                            ? 'Donnez un titre à votre CV pour le retrouver facilement plus tard.'
                            : 'Give your CV a title to easily find it later.')}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="resume-title" className={`text-right ${theme === 'dark' ? 'dark:text-white' : ''}`}>
                        {language === 'fr' ? 'Titre' : 'Title'}
                      </Label>
                      <Input
                        id="resume-title"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                        className={`col-span-3 ${theme === 'dark' 
                          ? 'dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:focus:border-blue-500' 
                          : ''
                        }`}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={handleSaveResume} 
                      className={theme === 'dark' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700 dark:border-blue-500' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-700'
                      }
                    >
                      {isEditMode
                        ? (language === 'fr' ? 'Mettre à jour' : 'Update')
                        : (language === 'fr' ? 'Sauvegarder' : 'Save')}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className={`mb-6 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('app.information')}
                </h3>
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
              </div>
              
              <div>
                <h3 className={`mb-6 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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