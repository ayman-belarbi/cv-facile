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
import { Check } from "lucide-react";

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
    { id: "classic", name: language === 'fr' ? 'Classique' : 'Classic' },
    { id: "modern", name: language === 'fr' ? 'Moderne' : 'Modern' },
    { id: "creative", name: language === 'fr' ? 'Créatif' : 'Creative' },
    { id: "medical", name: language === 'fr' ? 'Médical' : 'Medical' }
  ];

  return (
    <div className="space-y-4">
      <div className={`p-3 border rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <h3 className={`mb-3 text-base font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
          {language === 'fr' ? 'Modèle de CV' : 'CV Template'}
        </h3>
        <div className="flex flex-wrap justify-between">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`px-12 py-1.5 text-sm rounded-md transition-colors flex items-center gap-1.5 ${
                data.settings.template === template.id
                  ? theme === 'dark'
                    ? 'bg-cvfacile-primary text-white'
                    : 'bg-cvfacile-primary text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {data.settings.template === template.id && (
                <Check className="w-4 h-4" />
              )}
              {template.name}
            </button>
          ))}
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
