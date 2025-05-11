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
    <div className={`p-3 border rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <h3 className={`mb-2 text-base font-medium ${theme === 'dark' ? 'text-white' : ''}`}>
        {language === 'fr' ? 'Police du CV' : 'CV Font'}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {fonts.map((font) => (
          <div 
            key={font.id}
            onClick={() => onChange(font.id)}
            className={`relative p-2 border rounded-md cursor-pointer transition-all hover:shadow-sm ${
              selectedFont === font.id
                ? theme === 'dark'
                  ? 'border-cvfacile-primary bg-gray-700'
                  : 'border-cvfacile-primary bg-blue-50'
                : theme === 'dark'
                  ? 'border-gray-700'
                  : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`text-base ${theme === 'dark' ? 'text-white' : ''} ${font.headingClass}`}>
                Aa
              </div>
              <div className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} ${font.bodyClass}`}>
                {font.name}
              </div>
            </div>
            {selectedFont === font.id && (
              <div className="absolute -top-1 -right-1">
                <div className={`p-1 rounded-full ${theme === 'dark' ? 'bg-cvfacile-primary' : 'bg-cvfacile-primary'}`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontPicker;
