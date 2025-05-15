import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = t('title.login');
  }, [t]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: t('error'),
        description: t('fill.all.fields'),
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      toast({
        title: language === 'fr' ? 'Bon retour !' : 'Welcome back!',
        description: language === 'fr' ? 'Connexion réussie.' : 'Login successful.',
        variant: 'default',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: t('login.error'),
        description: t('login.error.desc'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-slate-900 dark:text-white">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{language === 'fr' ? 'Retour' : 'Back'}</span>
        </Button>
      </div>
      
      <div className="w-full max-w-md mb-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2">
            <LogIn className="h-8 w-8 text-cvfacile-primary dark:text-blue-400" />
            <span className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              CV Facile <span className="pro-badge text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-[length:200%_100%] text-white px-2 py-0.5 rounded-md inline-flex items-center justify-center shadow-sm animate-shine">PRO</span>
            </span>
          </Link>
        </div>
      </div>
      
      <Card className="w-full max-w-md shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{language === 'fr' ? t('app.login') : 'Log in'}</CardTitle>
          <CardDescription className="text-center dark:text-gray-300">
            {t('app.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="dark:text-gray-200">{t('app.email')}</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="email@example.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="focus:border-cvfacile-primary dark:bg-slate-700 dark:border-slate-600"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="dark:text-gray-200">{t('app.password')}</Label>
                <Link to="#" className="text-xs text-cvfacile-primary hover:underline dark:text-blue-400">
                  {t('forgot.password')}
                </Link>
              </div>
              <div className="relative">
                <Input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="focus:border-cvfacile-primary pr-10 dark:bg-slate-700 dark:border-slate-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-cvfacile-primary hover:bg-cvfacile-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? t('loading') : language === 'fr' ? t('app.login') : 'Log in'}
            </Button>
            
            <div className="text-center text-sm dark:text-gray-300">
              {t('no.account')} <Link to="/register" className="text-cvfacile-primary font-medium hover:text-cvfacile-primary/90 dark:text-blue-400">{t('app.signup')}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
