import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LogIn, User, Moon, Sun, Languages } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <div className="flex items-center space-x-2">
          <FileText className={`w-8 h-8 ${theme === 'dark' ? 'text-cvfacile-accent' : 'text-cvfacile-primary'}`} />
          <Link to="/" className={`text-xl font-bold font-poppins ${theme === 'dark' ? 'text-white' : 'text-gradient-primary'}`}>
            {language === 'fr' ? 'CV Facile' : 'Easy CV'}
          </Link>
        </div>
        
        <nav className="hidden space-x-6 text-sm font-medium md:flex">
          <Link to="/" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.home')}
          </Link>
          <Link to="/templates" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.templates')}
          </Link>
          <Link to="/how-it-works" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.how.works')}
          </Link>
          <Link to="/faq" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.faq')}
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
              {t('app.dashboard')}
            </Link>
          )}
        </nav>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
              >
                <Languages className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('fr')}>
                🇫🇷 Français {language === 'fr' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                🇺🇸 English {language === 'en' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} flex items-center`}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{user?.name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">{t('app.dashboard')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  {t('app.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button 
                variant="ghost" 
                asChild 
                className={`hidden sm:inline-flex ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600'}`}
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('app.login')}
                </Link>
              </Button>
              <Button 
                className={theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90' : 'bg-gradient-to-r from-cvfacile-primary to-cvfacile-accent hover:opacity-90'}
                asChild
              >
                <Link to="/register">{t('app.signup')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;