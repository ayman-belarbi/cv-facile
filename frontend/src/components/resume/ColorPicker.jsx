import React from 'react';
import { colorSchemes } from '@/lib/resumeData';
import { Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const ColorPicker = ({ selectedScheme, onChange }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleColorChange = (schemeName) => {
    // Pass the scheme name instead of the object
    onChange(schemeName);
  };

  return (
    <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
      <h3 className={`mb-3 text-base font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
        {language === 'fr' ? 'Couleur du CV' : 'CV Color'}
      </h3>
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(colorSchemes).map(([name, scheme]) => (
          <div 
            key={name}
            onClick={() => handleColorChange(name)}
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110 ${
              theme === 'dark' ? 'ring-2 ring-slate-700' : ''
            }`}
            style={{ backgroundColor: scheme.primary }}
          >
            {selectedScheme === name && (
              <Check className="w-5 h-5 text-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
