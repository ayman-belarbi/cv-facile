import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { fetchResumeById } from '@/services/resumeStorage';
import ResumePreview from '@/components/resume/ResumePreview';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ViewResume = () => {
  const { id } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const { isAuthenticated, token } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    if (id) {
      fetchResumeById(id, token)
        .then(resume => {
          setResumeData(typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data);
        })
        .catch(() => navigate('/dashboard'));
    }
  }, [id, isAuthenticated, navigate, token]);

  if (!resumeData) {
    return (
      <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'fr' ? 'Chargement...' : 'Loading...'}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <ResumePreview data={resumeData} viewOnly={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewResume;
