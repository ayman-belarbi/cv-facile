import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ProfileSettings = () => {
  const { user, updateProfile, deleteAccount } = useAuth();
  const { t, language } = useLanguage();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    if (password && password !== confirmPassword) {
      setError(language === 'fr' ? 'Les mots de passe ne correspondent pas.' : 'Passwords do not match.');
      return;
    }
    try {
      setLoading(true);
      await updateProfile({ name, email, password: password || undefined });
      toast({
        title: language === 'fr' ? 'Profil mis à jour' : 'Profile updated',
        description: language === 'fr' ? 'Votre profil a été modifié avec succès.' : 'Your profile was updated successfully.',
        variant: 'default',
      });
      setPassword("");
      setConfirmPassword("");
      navigate("/");
    } catch (err) {
      setError(err?.message || (language === 'fr' ? "Erreur lors de la mise à jour." : "Error updating profile."));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError("");
    try {
      setDeleting(true);
      await deleteAccount();
      toast({
        title: language === 'fr' ? 'Compte supprimé' : 'Account removed',
        description: language === 'fr' ? 'Votre compte a été supprimé avec succès.' : 'Your account has been successfully removed.',
        variant: 'default',
      });
      navigate("/");
    } catch (err) {
      setDeleteError(err?.message || (language === 'fr' ? "Erreur lors de la suppression du compte." : "Error deleting account."));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-slate-900 dark:text-white">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{language === 'fr' ? 'Retour' : 'Back'}</span>
        </Button>
      </div>
      <Card className="w-full max-w-md shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {t('app.profile.settings')}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                {t('app.name')}
              </label>
              <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder={language === 'fr' ? 'Votre nom complet' : 'Your full name'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                {t('app.email')}
              </label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                {t('app.password')} ({language === 'fr' ? 'laisser vide pour ne pas changer' : 'leave blank to keep unchanged'})
              </label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={language === 'fr' ? 'Nouveau mot de passe' : 'New password'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium dark:text-gray-200">
                {language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm password'}
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder={language === 'fr' ? 'Confirmez le mot de passe' : 'Confirm password'}
              />
            </div>
            {error && <div className="w-full rounded bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm text-center py-2 px-3 font-medium border border-red-200 dark:border-red-800 mb-2">{error}</div>}
            {success && <div className="w-full rounded bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm text-center py-2 px-3 font-medium border border-green-200 dark:border-green-800 mb-2">{success}</div>}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-cvfacile-primary hover:bg-cvfacile-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? (language === 'fr' ? 'Enregistrement...' : 'Saving...') : (language === 'fr' ? 'Enregistrer' : 'Save')}
            </Button>
          </CardFooter>
        </form>
        <div className="border-t mt-6 pt-6 px-2 bg-transparent">
          <div className="flex flex-col items-center">
            <AlertTriangle className="w-6 h-6 text-red-400 mb-2" />
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">{language === 'fr' ? 'Supprimer le compte' : 'Delete Account'}</h3>
            <p className="text-xs text-center mb-3 text-gray-500 dark:text-gray-400">{language === 'fr' ? 'Cette action est irréversible.' : 'This action cannot be undone.'}</p>
            {deleteError && (
              <div className="w-full rounded bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs text-center mb-2 py-2 px-3 font-medium border border-red-200 dark:border-red-800">
                {deleteError}
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              className="w-full border border-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium py-2 mt-1 transition"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting
                ? (language === 'fr' ? 'Suppression...' : 'Deleting...')
                : (language === 'fr' ? 'Supprimer mon compte' : 'Delete my account')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSettings; 