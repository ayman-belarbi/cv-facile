import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { LogIn, Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
      navigate('/dashboard');
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
    <div className={`min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="absolute top-4 right-4 flex space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className={theme === 'dark' ? 'text-white hover:text-white' : 'text-black hover:text-white'}
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>
      
      <div className="w-full max-w-md mb-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <LogIn className={`h-8 w-8 ${theme === 'dark' ? 'text-cvfacile-accent' : 'text-cvfacile-primary'}`} />
            <span className="text-2xl font-bold">CV Facile</span>
          </Link>
        </div>
      </div>
      
      <Card className={`w-full max-w-md ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}`}>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            {t('app.subtitle')}
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
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
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full text-white"
              disabled={loading}
            >
              {loading ? t('loading') : 'Log in'}
            </Button>
            
            <div className="text-center text-sm">
              {t('no.account')} <Link to="/register" className="text-cvfacile-accent hover:underline">{t('app.signup')}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
