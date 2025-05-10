import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MedicalTemplate from "./templates/MedicalTemplate";
import PDFButton from "../ui/PDFButton";
import ColorPicker from "./ColorPicker";
import FontPicker from "./FontPicker";
import { useMobile } from "@/hooks/use-mobile";

const ResumePreview = ({ data, updateResumeSettings }) => {
  const isMobile = useMobile();
  
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
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="mb-3 text-base font-medium flex items-center">Modèle de CV</h3>
        <div className={`grid grid-cols-2 gap-3 ${!isMobile ? 'md:grid-cols-4' : ''}`}>
          {["classic", "modern", "creative", "medical"].map((template) => (
            <div
              key={template}
              onClick={() => handleTemplateChange(template)}
              className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                data.settings.template === template
                  ? 'border-cvfacile-primary bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="mb-2 text-sm text-center capitalize">{template}</div>
              <div 
                className={`w-full h-24 bg-white rounded-md overflow-hidden flex items-center justify-center ${
                  data.settings.template === template ? "border-2 border-cvfacile-primary" : "border"
                }`}
                style={{ backgroundColor: data.settings.template === template ? `${data.settings.colorScheme.primary}10` : "" }}
              >
                <span className="text-xs uppercase font-medium" style={{ color: data.settings.colorScheme.primary }}>
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

      <div id="resume-preview" className="w-full overflow-x-auto bg-gray-100 shadow-inner rounded-lg p-6 flex justify-center">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
