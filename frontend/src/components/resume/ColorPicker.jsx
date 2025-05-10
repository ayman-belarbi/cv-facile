import React from 'react';
import { colorSchemes } from '@/lib/resumeData';
import { Check } from 'lucide-react';

const ColorPicker = ({ selectedScheme, onChange }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h3 className="mb-3 text-base font-medium">Couleur du CV</h3>
      <div className="grid grid-cols-5 gap-3">
        {Object.entries(colorSchemes).map(([name, scheme]) => (
          <div 
            key={name}
            onClick={() => onChange(scheme)}
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all hover:scale-110`}
            style={{ backgroundColor: scheme.primary }}
          >
            {selectedScheme.primary === scheme.primary && (
              <Check className="w-5 h-5 text-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
