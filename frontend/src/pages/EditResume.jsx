import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { fetchResumeById, updateResume as updateResumeAPI } from "@/services/resumeStorage";
import { ResumeData } from "@/lib/resumeData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const EditResume = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(ResumeData);
  const [resumeTitle, setResumeTitle] = useState("");
  const { isAuthenticated, token } = useAuth();
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (id) {
      fetchResumeById(id, token)
        .then(resume => {
          setResumeData(typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data);
          setResumeTitle(resume.title);
        })
        .catch(() => navigate("/dashboard"));
    }
  }, [id, isAuthenticated, navigate, token]);

  useEffect(() => {
    document.title = t('title.editresume');
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

  const handleSave = async () => {
    if (id) {
      try {
        await updateResumeAPI(id, {
          title: resumeTitle,
          data: {
            ...resumeData,
            settings: {
              ...resumeData.settings,
              language
            }
          }
        }, token);
        toast({
          title: language === 'fr' ? "CV sauvegardé" : "CV saved",
          description: language === 'fr' ? "Votre CV a été mis à jour avec succès" : "Your CV has been successfully updated",
        });
        navigate("/dashboard");
      } catch {
        toast({
          title: language === 'fr' ? "Erreur" : "Error",
          description: language === 'fr' ? "Mise à jour échouée" : "Update failed",
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white shadow-non">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold">
              {language === 'fr' ? "Modifier le CV" : "Edit CV"}
            </h1>
            
            <div className="flex items-center gap-3">
              <Input
                type="text"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="w-64 dark:bg-slate-700 dark:border-slate-600"
                placeholder={language === 'fr' ? "Titre du CV" : "CV Title"}
              />
              
              <Button
                onClick={handleSave}
                className="bg-cvfacile-primary hover:bg-cvfacile-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {language === 'fr' ? "Sauvegarder" : "Save"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <ResumeForm 
                resumeData={resumeData} 
                setResumeData={setResumeData}
                updateResumeSettings={updateResumeSettings}
              />
            </div>
            
            <div id="resume-preview" className="lg:w-1/2 sticky top-20">
              <ResumePreview 
                resumeData={resumeData} 
                updateResumeSettings={updateResumeSettings} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EditResume;
