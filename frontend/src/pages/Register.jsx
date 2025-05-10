import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { User, UserPlus, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      await register(email, password, name);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Échec de l'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="absolute top-4 right-4 flex space-x-4">
        <Button
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className={theme === 'dark' ? 'text-white' : 'text-gray-700'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      
      <div className="w-full max-w-md mb-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <UserPlus className={`h-8 w-8 ${theme === 'dark' ? 'text-cvfacile-accent' : 'text-cvfacile-primary'}`} />
            <span className="text-2xl font-bold">CV Facile</span>
          </Link>
        </div>
      </div>
      
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle>{t('app.signup')}</CardTitle>
          <CardDescription>
            {t('app.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('app.name')}</Label>
              <Input 
                id="name"
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('app.email')}</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('app.password')}</Label>
              <Input 
                id="password"
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer {t('app.password').toLowerCase()}</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Chargement..." : t('app.signup')}
            </Button>
            
            <div className="text-center text-sm">
              Déjà inscrit ? <Link to="/login" className="text-cvfacile-accent hover:underline">{t('app.login')}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
