import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { fetchResumes, deleteResume as deleteResumeAPI } from '@/services/resumeStorage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Trash2, Edit, Plus, Eye, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS, ar } from 'date-fns/locale';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const { user, isAuthenticated, token } = useAuth();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchResumes(token)
        .then(setResumes)
        .catch(() => setResumes([]));
    }
  }, [isAuthenticated, navigate, token]);

  const handleDeleteResume = async (id) => {
    try {
      await deleteResumeAPI(id, token);
      const updated = await fetchResumes(token);
      setResumes(updated);
      toast({
        title: language === 'fr' ? "CV supprimé" : "CV deleted",
        description: language === 'fr' ? "Le CV a été supprimé avec succès" : "The CV has been successfully deleted",
      });
    } catch {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: language === 'fr' ? "Suppression échouée" : "Delete failed",
        variant: 'destructive',
      });
    }
  };

  const getFormattedDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true,
        locale: language === 'fr' ? fr : language === 'ar' ? ar : enUS
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-900 dark:text-white">
      <Navbar />
      
      <main className="flex-1">
        <div className="py-8 md:py-12 bg-gray-50 dark:bg-slate-800">
          <div className="container px-4 mx-auto">
            <h1 className="text-2xl font-bold mb-2">{t('app.dashboard')}</h1>
            <p className="text-gray-600 dark:text-gray-300">
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
              <Button className="bg-cvfacile-primary hover:bg-cvfacile-primary/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Créer un nouveau CV' : 'Create a new CV'}
              </Button>
            </Link>
          </div>

          {/* CV list */}
          <h2 className="text-xl font-semibold mb-4">{t('app.saved.cvs')}</h2>
          
          {resumes.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">
                {language === 'fr' ? "Aucun CV sauvegardé" : "No saved CVs"}
              </h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                {language === 'fr' 
                  ? "Commencez par créer votre premier CV" 
                  : "Start by creating your first CV"}
              </p>
              <div className="mt-6">
                <Link to="/">
                  <Button className="bg-cvfacile-primary hover:bg-cvfacile-primary/90 text-white dark:bg-blue-600 dark:hover:bg-blue-700">
                    {language === 'fr' ? 'Créer un CV' : 'Create a CV'}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
              {resumes.map((resume) => (
                <Card key={resume.id} className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold">{resume.title}</CardTitle>
                    <CardDescription className="dark:text-gray-300 text-sm">
                      {getFormattedDate(resume.updated_at || resume.created_at || resume.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 flex flex-col items-center justify-center rounded-md bg-gray-50 dark:bg-slate-700/50 border border-gray-200 dark:border-slate-600 mt-3">
                      <FileText className="h-10 w-10 text-gray-500 dark:text-gray-400 mb-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-200 truncate w-full text-center px-2">{resume.title}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 justify-between pt-4">
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <Button variant="ghost" asChild className="px-3 py-2">
                        <Link to={`/edit/${resume.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          {language === 'fr' ? 'Modifier' : 'Edit'}
                        </Link>
                      </Button>
                      <Button variant="ghost" asChild className="px-3 py-2">
                        <Link to={`/view/${resume.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          {language === 'fr' ? 'Voir' : 'View'}
                        </Link>
                      </Button>
                      <Button variant="ghost" onClick={() => {navigator.clipboard.writeText(window.location.origin+`/view/${resume.id}`); toast({title: language==='fr'?'Lien copié':'Link copied'});}} className="px-3 py-2">
                        <Share2 className="h-4 w-4 mr-2" />
                        {language === 'fr' ? 'Partager' : 'Share'}
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteResume(resume.id)} className="px-3 py-2">
                        <Trash2 className="h-4 w-4 mr-2" />
                        {language === 'fr' ? 'Supprimer' : 'Remove'}
                      </Button>
                    </div>
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
