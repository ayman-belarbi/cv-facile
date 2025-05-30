import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    'app.title': 'Easy CV',
    'app.subtitle': 'Create a professional CV in minutes',
    'app.create.now': 'Create my CV now',
    'app.create': 'Create my CV',
    'app.why.choose': 'Why choose Easy CV?',
    'app.prof.templates': 'Professional templates',
    'app.easy.custom': 'Easy customization',
    'app.pdf.export': 'PDF Export',
    'app.intuitive.interface': 'Intuitive interface',
    'app.real.time.preview': 'Real-time preview',
    'app.secure.save': 'Secure saving',
    'app.build.prof.cv': 'Build your professional CV',
    'app.information': 'Information',
    'app.preview': 'Preview',
    'app.boost.career': 'Ready to boost your career?',
    'app.create.account': 'Create a free account',
    'app.learn.more': 'Learn more',
    'app.login': 'Login',
    'app.signup': 'Sign up',
    'app.home': 'Home',
    'app.templates': 'Templates',
    'app.how.works': 'How it works',
    'app.faq': 'FAQ',
    'app.dashboard': 'Dashboard',
    'app.saved.cvs': 'Saved CVs',
    'app.logout': 'Logout',
    'app.email': 'Email',
    'app.password': 'Password',
    'app.name': 'Name',
    'app.save.cv': 'Save CV',
    'app.dark.mode': 'Dark mode',
    'app.light.mode': 'Light mode',
    'cv.font': 'CV Font',
    'cv.template': 'CV Template',
    'cv.preview': 'Preview',
    'cv.download.pdf': 'Download PDF',
    'error': 'Error',
    'fill.all.fields': 'Please fill in all fields',
    'passwords.not.match': 'Passwords do not match',
    'register.error': 'Registration failed',
    'register.error.desc': 'An error occurred during registration',
    'loading': 'Loading...',
    'already.have.account': 'Already have an account?',
    'no.account': "Don't have an account?",
    'login.error': 'Login failed',
    'login.error.desc': 'Incorrect email or password',
    'title.login': 'Log in | Easy CV',
    'title.register': 'Sign up | Easy CV',
    'title.home': 'Home | Easy CV',
    'title.templates': 'Templates | Easy CV',
    'title.dashboard': 'Dashboard | Easy CV',
    'title.faq': 'FAQ | Easy CV',
    'title.howitworks': 'How It Works | Easy CV',
    'title.notfound': '404 Not Found | Easy CV',
    'title.editresume': 'Edit CV | Easy CV',
    'title.buildresume': 'Build CV | Easy CV',
    'app.profile.settings': 'Profile Settings',
    'change': 'Change',
    'edit.name': 'Edit Name',
    'edit.name.desc': 'Update your name and save changes.',
    'edit.email': 'Edit Email',
    'edit.email.desc': 'Update your email and save changes.',
    'save': 'Save',
    'success': 'Success',
    'profile.updated': 'Profile updated successfully.',
    'profile.update.failed': 'Failed to update profile.',
    'password.section': 'Password',
    'change.password': 'Change Password',
    'change.password.desc': 'Enter your current password and choose a new one.',
    'current.password': 'Current Password',
    'new.password': 'New Password',
    'confirm.new.password': 'Confirm New Password',
    'password.updated': 'Password updated successfully.',
    'password.update.failed': 'Failed to update password.',
    'remove.account': 'Remove Account',
    'remove.account.desc': 'Type delete to confirm account removal. This action cannot be undone.',
    'remove': 'Remove',
    'type.delete.to.confirm': 'Type delete to confirm',
    'account.removed': 'Account removed successfully.',
    'account.remove.failed': 'Failed to remove account.',
  },
  fr: {
    'app.title': 'CV Facile',
    'app.subtitle': 'Créez un CV professionnel en quelques minutes',
    'app.create.now': 'Créer mon CV maintenant',
    'app.create': 'Créer mon CV',
    'app.why.choose': 'Pourquoi choisir CV Facile?',
    'app.prof.templates': 'Modèles professionnels',
    'app.easy.custom': 'Personnalisation facile',
    'app.pdf.export': 'Export PDF',
    'app.intuitive.interface': 'Interface intuitive',
    'app.real.time.preview': 'Aperçu en temps réel',
    'app.secure.save': 'Sauvegarde sécurisée',
    'app.build.prof.cv': 'Construisez votre CV professionnel',
    'app.information': 'Informations',
    'app.preview': 'Aperçu',
    'app.boost.career': 'Prêt à booster votre carrière ?',
    'app.create.account': 'Créer un compte gratuit',
    'app.learn.more': 'En savoir plus',
    'app.login': 'Connexion',
    'app.signup': 'Inscription',
    'app.home': 'Accueil',
    'app.templates': 'Modèles',
    'app.how.works': 'Comment ça marche',
    'app.faq': 'FAQ',
    'app.dashboard': 'Tableau de bord',
    'app.saved.cvs': 'CV sauvegardés',
    'app.logout': 'Déconnexion',
    'app.email': 'Email',
    'app.password': 'Mot de passe',
    'app.name': 'Nom',
    'app.save.cv': 'Sauvegarder le CV',
    'app.dark.mode': 'Mode sombre',
    'app.light.mode': 'Mode clair',
    'cv.font': 'Police du CV',
    'cv.template': 'Modèle de CV',
    'cv.preview': 'Aperçu',
    'cv.download.pdf': 'Télécharger en PDF',
    'error': 'Erreur',
    'fill.all.fields': 'Veuillez remplir tous les champs',
    'passwords.not.match': 'Les mots de passe ne correspondent pas',
    'register.error': "Échec de l'inscription",
    'register.error.desc': "Une erreur est survenue lors de l'inscription",
    'loading': 'Chargement...',
    'already.have.account': 'Déjà inscrit ?',
    'no.account': 'Pas de compte ?',
    'login.error': 'Échec de connexion',
    'login.error.desc': 'Email ou mot de passe incorrect',
    'title.login': 'Connexion | CV Facile',
    'title.register': 'Inscription | CV Facile',
    'title.home': 'Accueil | CV Facile',
    'title.templates': 'Modèles | CV Facile',
    'title.dashboard': 'Tableau de bord | CV Facile',
    'title.faq': 'FAQ | CV Facile',
    'title.howitworks': 'Comment ça marche | CV Facile',
    'title.notfound': '404 Introuvable | CV Facile',
    'title.editresume': 'Modifier le CV | CV Facile',
    'title.buildresume': 'Créer CV | CV Facile',
    'app.profile.settings': 'Paramètres du profil',
    'change': 'Modifier',
    'edit.name': 'Modifier le nom',
    'edit.name.desc': 'Mettez à jour votre nom et enregistrez les modifications.',
    'edit.email': 'Modifier l\'email',
    'edit.email.desc': 'Mettez à jour votre email et enregistrez les modifications.',
    'save': 'Enregistrer',
    'success': 'Succès',
    'profile.updated': 'Profil mis à jour avec succès.',
    'profile.update.failed': 'Échec de la mise à jour du profil.',
    'password.section': 'Mot de passe',
    'change.password': 'Modifier le mot de passe',
    'change.password.desc': 'Entrez votre mot de passe actuel et choisissez un nouveau.',
    'current.password': 'Mot de passe actuel',
    'new.password': 'Nouveau mot de passe',
    'confirm.new.password': 'Confirmer le nouveau mot de passe',
    'password.updated': 'Mot de passe mis à jour avec succès.',
    'password.update.failed': 'Échec de la mise à jour du mot de passe.',
    'remove.account': 'Supprimer le compte',
    'remove.account.desc': 'Tapez delete pour confirmer la suppression du compte. Cette action est irréversible.',
    'remove': 'Supprimer',
    'type.delete.to.confirm': 'Tapez delete pour confirmer',
    'account.removed': 'Compte supprimé avec succès.',
    'account.remove.failed': 'Échec de la suppression du compte.',
  }
};

const LanguageContext = createContext({
  language: 'fr',
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};