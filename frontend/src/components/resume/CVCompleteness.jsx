import React from 'react';
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, XCircle } from "lucide-react";

const CVCompleteness = ({ resumeData }) => {
  const { language } = useLanguage();

  const calculateProgress = () => {
    let totalProgress = 0;

    // Personal Info (20%)
    const personalFields = ['firstName', 'lastName', 'title', 'email', 'phone'];
    const personalProgress = (personalFields.filter(field => resumeData.personalInfo[field]).length / personalFields.length) * 20;
    totalProgress += personalProgress;

    // Experience (20%)
    if (resumeData.experiences && resumeData.experiences.length > 0) {
      totalProgress += 20;
    }

    // Education (20%)
    if (resumeData.education && resumeData.education.length > 0) {
      totalProgress += 20;
    }

    // Skills (20%)
    if (resumeData.skills && resumeData.skills.length > 0) {
      totalProgress += 20;
    }

    // Languages (20%)
    if (resumeData.languages && resumeData.languages.length > 0) {
      totalProgress += 20;
    }

    return totalProgress;
  };

  const progress = calculateProgress();

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-medium dark:text-white">
          {language === 'fr' ? 'Progression du CV' : 'CV Progress'}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold dark:text-white">
            {Math.round(progress)}%
          </span>
          {progress === 100 ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="w-5 h-5 text-blue-600" />
          )}
        </div>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
};

export default CVCompleteness; 