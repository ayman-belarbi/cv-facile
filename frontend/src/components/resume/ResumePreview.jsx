import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MedicalTemplate from "./templates/MedicalTemplate";
import PDFButton from "../ui/PDFButton";
import ColorPicker from "./ColorPicker";
import FontPicker from "./FontPicker";
import { useMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Layout, Sparkles, Briefcase, Stethoscope } from "lucide-react";

const ResumePreview = ({ data, updateResumeSettings }) => {
  const isMobile = useMobile();
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const renderTemplate = () => {
    switch (data.settings.template) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "medical":
        return <MedicalTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  const handleTemplateChange = (template) => {
    updateResumeSettings({ template });
  };

  const handleColorSchemeChange = (colorScheme) => {
    updateResumeSettings({ colorScheme });
  };

  const handleFontChange = (font) => {
    updateResumeSettings({ font });
  };

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
      <div className={`p-4 border rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <h3 className={`mb-4 text-base font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
          {language === 'fr' ? 'Modèle de CV' : 'CV Template'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`group relative p-3 rounded-lg transition-all duration-200 ${
                  data.settings.template === template.id
                    ? theme === 'dark'
                      ? 'bg-cvfacile-primary/20 border-2 border-cvfacile-primary'
                      : 'bg-cvfacile-primary/10 border-2 border-cvfacile-primary'
                    : theme === 'dark'
                      ? 'bg-gray-700/50 border border-gray-600 hover:bg-gray-700'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
              }`}
            >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-2 rounded-full mb-2 ${
                    data.settings.template === template.id
                      ? 'bg-cvfacile-primary text-white'
                      : theme === 'dark'
                        ? 'bg-gray-600 text-gray-300'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`text-sm font-medium mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {template.name}
                  </div>
                  <div className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {template.description}
                  </div>
                </div>
                {data.settings.template === template.id && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-cvfacile-primary rounded-full p-1">
                      <Check className="w-3 h-3 text-white" />
              </div>
            </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2`}>
        <ColorPicker
          selectedScheme={data.settings.colorScheme}
          onChange={handleColorSchemeChange}
        />
        
        <FontPicker
          selectedFont={data.settings.font}
          onChange={handleFontChange}
        />
      </div>

      <div className="flex items-center justify-end">
        <PDFButton resumeData={data} previewId="resume-preview" />
      </div>

      <div id="resume-preview" className={`w-full overflow-x-auto ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100'} shadow-inner rounded-lg p-4 flex justify-center`}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
