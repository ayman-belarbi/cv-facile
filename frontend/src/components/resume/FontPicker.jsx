import React from 'react';
import { fontMappings } from '@/lib/resumeData';
import { Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const FontPicker = ({ selectedFont, onChange }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const fonts = [
    {
      id: 'inter',
      name: 'Inter',
      headingClass: 'font-inter',
      bodyClass: 'font-inter',
      description: language === 'fr' ? 'Moderne et très lisible' : 'Modern and highly readable'
    },
    {
      id: 'poppins',
      name: 'Poppins',
      headingClass: 'font-poppins',
      bodyClass: 'font-poppins',
      description: language === 'fr' ? 'Propre et professionnel' : 'Clean and professional'
    },
    {
      id: 'montserrat',
      name: 'Montserrat',
      headingClass: 'font-montserrat',
      bodyClass: 'font-montserrat',
      description: language === 'fr' ? 'Polyvalent et réactif' : 'Versatile and responsive'
    }
  ];

  return (
    <div className={`p-4 border rounded-lg ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'}`}>
      <h3 className={`mb-3 text-base font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
        {language === 'fr' ? 'Police du CV' : 'CV Font'}
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {fonts.map((font) => (
          <button
            key={font.id}
            onClick={() => onChange(font.id)}
            className={`group relative p-3 rounded-lg transition-all duration-200 border-2 ${
              selectedFont === font.id
                ? theme === 'dark'
                  ? 'border-blue-600'
                  : 'border-cvfacile-primary'
                : theme === 'dark'
                  ? 'border-slate-700 hover:border-slate-600'
                  : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`text-xl ${
                selectedFont === font.id
                  ? theme === 'dark' ? 'text-blue-400' : 'text-cvfacile-primary'
                  : theme === 'dark' ? 'text-white' : 'text-gray-900'
              } ${font.headingClass}`}>
                Aa
              </div>
              <div className={`mt-1 text-xs ${
                selectedFont === font.id
                  ? theme === 'dark' ? 'font-medium text-blue-400' : 'font-medium text-cvfacile-primary' 
                  : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              } ${font.bodyClass}`}>
                {font.name}
              </div>
            </div>
            {selectedFont === font.id && (
              <div className="absolute -top-1 -right-1">
                <div className={`${theme === 'dark' ? 'bg-blue-600' : 'bg-cvfacile-primary'} rounded-full p-1`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontPicker;
