import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getResumeById, updateResume } from "@/services/resumeStorage";
import { ResumeData } from "@/lib/resumeData";
import Navbar from "@/components/layout/Navbar";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import { useToast } from "@/hooks/use-toast";

const EditResume = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(ResumeData);
  const [resumeTitle, setResumeTitle] = useState("");
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    if (id) {
      const resume = getResumeById(id);
      if (resume) {
        setResumeData(resume.resumeData);
        setResumeTitle(resume.title);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, isAuthenticated, navigate]);

  const updateResumeSettings = (settings) => {
    setResumeData({
      ...resumeData,
      settings: {
        ...resumeData.settings,
        ...settings,
      },
    });
  };

  const handleSave = () => {
    if (id) {
      updateResume(id, { 
        title: resumeTitle, 
        resumeData: {
          ...resumeData,
          settings: {
            ...resumeData.settings,
            language
          }
        } 
      });
      
      toast({
        title: language === 'fr' ? "CV sauvegardé" : "CV saved",
        description: language === 'fr' ? "Votre CV a été mis à jour avec succès" : "Your CV has been successfully updated",
      });
      
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Navbar />
      
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {language === 'fr' ? "Modifier le CV" : "Edit CV"}
          </h1>
          
          <div className="flex items-center">
            <input
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="mr-4 p-2 border rounded"
              placeholder={language === 'fr' ? "Titre du CV" : "CV Title"}
            />
            
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-cvfacile-primary text-white rounded hover:bg-opacity-90"
            >
              {language === 'fr' ? "Sauvegarder" : "Save"}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-xl font-semibold">
              {language === 'fr' ? "Informations" : "Information"}
            </h3>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>
          
          <div>
            <h3 className="mb-6 text-xl font-semibold">
              {language === 'fr' ? "Aperçu" : "Preview"}
            </h3>
            <ResumePreview data={resumeData} updateResumeSettings={updateResumeSettings} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditResume;
