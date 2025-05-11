import React from 'react';
import { fontMappings } from '@/lib/resumeData';
import { Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const FontPicker = ({ selectedFont, onChange }) => {
  const { theme } = useTheme();

  return (
    <div className={`p-4 border rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
      <h3 className={`mb-3 text-base font-medium ${theme === 'dark' ? 'text-white' : ''}`}>Police du CV</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(fontMappings).map(([name, font]) => (
          <div 
            key={name}
            onClick={() => onChange(name)}
            className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              selectedFont === name
                ? theme === 'dark'
                  ? 'border-cvfacile-primary bg-gray-700'
                  : 'border-cvfacile-primary bg-blue-50'
                : theme === 'dark'
                  ? 'border-gray-700'
                  : 'border-gray-200'
            }`}
          >
            <div className={`text-center ${theme === 'dark' ? 'text-white' : ''}`} style={{ fontFamily: font }}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </div>
            {selectedFont === name && (
              <div className="flex justify-center mt-2">
                <Check className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-cvfacile-primary'}`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FontPicker;
