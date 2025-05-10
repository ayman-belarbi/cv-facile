import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { getSavedResumes, deleteResume } from '@/services/resumeStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Trash2, Edit, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setResumes(getSavedResumes());
    }
  }, [isAuthenticated, navigate]);

  const handleDeleteResume = (id) => {
    if (deleteResume(id)) {
      setResumes(getSavedResumes());
      toast({
        title: language === 'fr' ? "CV supprimé" : "CV deleted",
        description: language === 'fr' ? "Le CV a été supprimé avec succès" : "The CV has been successfully deleted",
      });
    }
  };

  const getFormattedDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: language === 'fr' ? fr : enUS
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
      <Navbar />
      
      <main className="flex-1">
        <div className={`py-8 md:py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="container px-4 mx-auto">
            <h1 className="text-2xl font-bold mb-2">{t('app.dashboard')}</h1>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {language === 'fr' 
                ? `Bienvenue, ${user?.name || user?.email}. Gérez vos CV ici.` 
                : `Welcome, ${user?.name || user?.email}. Manage your CVs here.`}
            </p>
          </div>
        </div>

        <div className="container px-4 mx-auto py-8">
          {/* Create new CV button */}
          <div className="mb-8">
            <Link to="/">
              <Button className={`${theme === 'dark' ? 'bg-cvfacile-accent' : 'bg-cvfacile-primary'}`}>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Créer un nouveau CV' : 'Create a new CV'}
              </Button>
            </Link>
          </div>

          {/* CV list */}
          <h2 className="text-xl font-semibold mb-4">{t('app.saved.cvs')}</h2>
          
          {resumes.length === 0 ? (
            <div className={`text-center py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">
                {language === 'fr' ? "Aucun CV sauvegardé" : "No saved CVs"}
              </h3>
              <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'fr' 
                  ? "Commencez par créer votre premier CV" 
                  : "Start by creating your first CV"}
              </p>
              <div className="mt-6">
                <Link to="/">
                  <Button>
                    {language === 'fr' ? 'Créer un CV' : 'Create a CV'}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resumes.map((resume) => (
                <Card key={resume.id} className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                  <CardHeader className="pb-2">
                    <CardTitle>{resume.title}</CardTitle>
                    <CardDescription>
                      {getFormattedDate(resume.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`h-32 flex items-center justify-center rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <FileText className={`h-10 w-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to={`/edit/${resume.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        {language === 'fr' ? 'Modifier' : 'Edit'}
                      </Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDeleteResume(resume.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      {language === 'fr' ? 'Supprimer' : 'Delete'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
