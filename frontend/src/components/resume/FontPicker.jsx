import React from 'react';
import { fontMappings } from '@/lib/resumeData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMobile } from '@/hooks/use-mobile';
import { Text } from 'lucide-react';

const FontPicker = ({ selectedFont, onChange }) => {
  const isMobile = useMobile();
  
  const fontOptions = [
    { value: 'default', label: 'Standard', sample: 'Aa Bb Cc' },
    { value: 'elegant', label: 'Élégant', sample: 'Aa Bb Cc' },
    { value: 'modern', label: 'Moderne', sample: 'Aa Bb Cc' },
    { value: 'technical', label: 'Technique', sample: 'Aa Bb Cc' },
  ];

  return (
    <Card className="border shadow-sm bg-white">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base font-medium flex items-center">
          <Text className="w-4 h-4 mr-2" />
          Police du CV
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className={`grid grid-cols-2 ${!isMobile ? 'md:grid-cols-4' : ''} gap-3`}>
          {fontOptions.map((font) => (
            <div
              key={font.value}
              onClick={() => onChange(font.value)}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedFont === font.value
                  ? 'border-cvfacile-primary bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <p className="mb-2 text-sm text-center">{font.label}</p>
              <div 
                className={`flex items-center justify-center p-3 rounded-md bg-white text-lg text-center ${
                  fontMappings[font.value].heading
                } ${
                  selectedFont === font.value ? 'border-2 border-cvfacile-primary' : 'border'
                }`}
                style={{ 
                  height: '50px',
                  backgroundColor: selectedFont === font.value ? '#f0f7ff' : '#ffffff'
                }}
              >
                {font.sample}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FontPicker;
