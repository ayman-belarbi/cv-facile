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

const ResumePreview = ({ data, updateResumeSettings }) => {
  const isMobile = useMobile();
  const { theme } = useTheme();
  
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

  return (
    <div className="space-y-6">
      <div className={`p-4 border rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <h3 className={`mb-3 text-base font-medium flex items-center ${theme === 'dark' ? 'text-white' : ''}`}>Modèle de CV</h3>
        <div className={`grid grid-cols-2 gap-3 ${!isMobile ? 'md:grid-cols-4' : ''}`}>
          {["classic", "modern", "creative", "medical"].map((template) => (
            <div
              key={template}
              onClick={() => handleTemplateChange(template)}
              className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                data.settings.template === template
                  ? theme === 'dark' 
                    ? 'border-cvfacile-primary bg-gray-700' 
                    : 'border-cvfacile-primary bg-blue-50'
                  : theme === 'dark'
                    ? 'border-gray-700'
                    : 'border-gray-200'
              }`}
            >
              <div className={`mb-2 text-sm text-center capitalize ${theme === 'dark' ? 'text-white' : ''}`}>{template}</div>
              <div 
                className={`w-full h-24 rounded-md overflow-hidden flex items-center justify-center ${
                  data.settings.template === template 
                    ? "border-2 border-cvfacile-primary" 
                    : theme === 'dark' 
                      ? "border border-gray-700 bg-gray-700" 
                      : "border bg-white"
                }`}
                style={{ backgroundColor: data.settings.template === template ? `${data.settings.colorScheme.primary}10` : "" }}
              >
                <span className={`text-xs uppercase font-medium ${theme === 'dark' ? 'text-white' : ''}`} style={{ color: data.settings.colorScheme.primary }}>
                  Aperçu
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
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

      <div id="resume-preview" className={`w-full overflow-x-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} shadow-inner rounded-lg p-6 flex justify-center`}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
