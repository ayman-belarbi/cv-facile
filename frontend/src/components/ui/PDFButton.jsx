import React from 'react';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { generatePDF } from '@/lib/pdfGenerator';
import { useMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const PDFButton = ({ resumeData, previewId }) => {
  const isMobile = useMobile();
  const { theme } = useTheme();
  const { language } = useLanguage();
  
  const handleDownload = () => {
    generatePDF(resumeData, previewId);
  };

  return (
    <Button 
      onClick={handleDownload}
      className={`${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-indigo-700' : 'bg-gradient-to-r from-cvfacile-orange to-cvfacile-accent'} hover:opacity-90 transition-all shadow-md`}
    >
      <Download className="w-4 h-4 mr-2" />
      {isMobile ? 'PDF' : language === 'fr' ? 'Télécharger en PDF' : 'Download PDF'}
    </Button>
  );
};

export default PDFButton;
