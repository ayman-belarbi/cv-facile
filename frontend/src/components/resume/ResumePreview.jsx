import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MedicalTemplate from "./templates/MedicalTemplate";
import { useMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Layout, Sparkles, Briefcase, Stethoscope } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fontMappings, colorSchemes } from "@/lib/resumeData";

// Default settings to prevent errors
const DEFAULT_SETTINGS = {
  template: "classic",
  colorScheme: "blue",
  font: "Inter",
  language: "en",
};

const ResumePreview = ({ data, resumeData, updateResumeSettings, viewOnly = false }) => {
  const isMobile = useMobile();
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  // Use resumeData prop if data is not provided (handle both prop naming patterns)
  let resumeInfo = data || resumeData || {};
  
  // Ensure we have valid settings with defaults
  if (!resumeInfo.settings) {
    console.warn("ResumePreview: Missing settings, using defaults", { data, resumeData });
    resumeInfo = {
      ...resumeInfo,
      settings: { ...DEFAULT_SETTINGS }
    };
  } else {
    // Merge default settings to ensure all settings properties exist
    resumeInfo = {
      ...resumeInfo,
      settings: {
        ...DEFAULT_SETTINGS,
        ...resumeInfo.settings
      }
    };
  }

  const renderTemplate = () => {
    try {
      switch (resumeInfo.settings.template) {
        case "classic":
          return <ClassicTemplate data={resumeInfo} />;
        case "modern":
          return <ModernTemplate data={resumeInfo} />;
        case "creative":
          return <CreativeTemplate data={resumeInfo} />;
        case "medical":
          return <MedicalTemplate data={resumeInfo} />;
        default:
          return <ClassicTemplate data={resumeInfo} />;
      }
    } catch (error) {
      console.error("Error rendering template:", error);
      return <div className="p-4 bg-red-50 text-red-500 border border-red-200 rounded">Error rendering template</div>;
    }
  };

  const handleTemplateChange = (template) => {
    if (updateResumeSettings) {
      updateResumeSettings({ template });
    }
  };

  if (viewOnly) {
    return (
      <div 
        id="resume-preview" 
        className="w-full bg-gray-100 border dark:bg-slate-800 dark:border-slate-700 rounded-lg p-4"
      >
        <div className="flex justify-center">
          {renderTemplate()}
        </div>
      </div>
    );
  }

  const templates = [
    { 
      id: "classic", 
      name: language === 'fr' ? 'Classique' : 'Classic',
      icon: Layout,
      description: language === 'fr' ? 'Style traditionnel' : 'Traditional style'
    },
    { 
      id: "modern", 
      name: language === 'fr' ? 'Moderne' : 'Modern',
      icon: Sparkles,
      description: language === 'fr' ? 'Design contemporain' : 'Contemporary design'
    },
    { 
      id: "creative", 
      name: language === 'fr' ? 'Créatif' : 'Creative',
      icon: Briefcase,
      description: language === 'fr' ? 'Style unique' : 'Unique style'
    },
    { 
      id: "medical", 
      name: language === 'fr' ? 'Médical' : 'Medical',
      icon: Stethoscope,
      description: language === 'fr' ? 'Format médical' : 'Medical format'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
        <h3 className="mb-4 text-base font-medium dark:text-white">
          {language === 'fr' ? 'Modèle de CV' : 'CV Template'}
        </h3>
        
        <Select 
          value={resumeInfo.settings.template} 
          onValueChange={handleTemplateChange}
          defaultValue="classic"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={language === 'fr' ? 'Choisir un modèle' : 'Select a template'} />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <SelectItem key={template.id} value={template.id}>
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{template.name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div 
        id="resume-preview" 
        className="w-full bg-gray-100 border dark:bg-slate-800 dark:border-slate-700 rounded-lg p-4"
      >
        <div className="flex justify-center">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
