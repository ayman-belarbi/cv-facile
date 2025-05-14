import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileUser, LogIn, User, Moon, Sun, Languages, Menu, UserPlus } from 'lucide-react';
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
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMobile } from '@/hooks/use-mobile';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isMobile = useMobile();
  const [open, setOpen] = React.useState(false);

  // Logo Component
  const Logo = () => (
        <div className="flex items-center gap-2">
          <FileUser className={`w-7 h-7 ${theme === 'dark' ? 'text-blue-400' : 'text-cvfacile-primary'}`} />
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-poppins flex items-center gap-2 dark:text-white text-gray-900">
              {language === 'fr' ? 'CV Facile' : 'Easy CV'} <span className="pro-badge text-sm font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-[length:200%_100%] text-white px-2 py-0.5 rounded-md inline-flex items-center justify-center shadow-sm animate-shine">PRO</span>
            </span>
          </Link>
        </div>
  );
        
  // Desktop Navigation Links
  const DesktopNav = () => (
        <nav className="hidden space-x-6 text-sm font-medium md:flex">
          <Link 
            to="/" 
            className={`transition-colors hover:text-cvfacile-primary ${
              location.pathname === '/' 
                ? 'text-cvfacile-primary dark:text-blue-400 font-semibold' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {t('app.home')}
          </Link>
          <Link 
            to="/templates" 
            className={`transition-colors hover:text-cvfacile-primary ${
              location.pathname === '/templates' 
                ? 'text-cvfacile-primary dark:text-blue-400 font-semibold' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {t('app.templates')}
          </Link>
          <Link 
            to="/build" 
            className={`transition-colors hover:text-cvfacile-primary ${
              location.pathname === '/build' 
                ? 'text-cvfacile-primary dark:text-blue-400 font-semibold' 
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {t('app.create')}
          </Link>
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`transition-colors hover:text-cvfacile-primary ${
                location.pathname === '/dashboard' 
                  ? 'text-cvfacile-primary dark:text-blue-400 font-semibold' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {t('app.dashboard')}
            </Link>
          )}
        </nav>
  );
        
  // Language Dropdown
  const LanguageDropdown = () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              >
                <Languages className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-slate-800 dark:border-slate-700">
              <DropdownMenuItem 
                onClick={() => setLanguage('fr')}
                className={language === 'fr' ? 'bg-gray-100 dark:bg-slate-700' : ''}
              >
                🇫🇷 Français {language === 'fr' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-gray-100 dark:bg-slate-700' : ''}
              >
                🇺🇸 English {language === 'en' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
  );

  // Theme Toggle Button
  const ThemeToggle = () => (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
  );
          
  // Auth Buttons
  const AuthButtons = () => {
    if (isAuthenticated) {
      return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                >
                  <User className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">{user?.name || user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-slate-800 dark:border-slate-700">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <FileUser className="w-4 h-4" />
                    {t('app.dashboard')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()} className="flex items-center gap-2">
                  <LogIn className="w-4 h-4 rotate-180" />
                  {t('app.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
      );
    }

    return (
            <>
              <Button 
                variant="ghost" 
                asChild 
                className="hidden sm:inline-flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              >
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  {language === 'fr' ? t('app.login') : 'Log in'}
                </Link>
              </Button>
              <Button 
                className="flex items-center gap-2 bg-cvfacile-primary hover:opacity-90 dark:bg-blue-600 text-white"
                asChild
              >
                <Link to="/register">
                  <UserPlus className="w-4 h-4" />
                  {t('app.signup')}
                </Link>
              </Button>
            </>
    );
  };

  // Mobile Menu Button
  const MobileMenuButton = () => (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setOpen(true)} 
      className="rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 md:hidden"
    >
      <Menu className="w-6 h-6" />
    </Button>
  );

  // Mobile Drawer
  const MobileDrawer = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-64 p-0 bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-slate-800">
            <Logo />
          </div>
          
          <nav className="flex flex-col px-4 py-6">
            <Link 
              to="/" 
              className={`py-2 px-3 rounded-md mb-1 transition-colors ${
                location.pathname === '/' 
                  ? 'bg-gray-100 text-cvfacile-primary dark:bg-slate-800 dark:text-blue-400'
                  : ''
              }`} 
              onClick={() => setOpen(false)}
            >
              {t('app.home')}
            </Link>
            <Link 
              to="/templates" 
              className={`py-2 px-3 rounded-md mb-1 transition-colors ${
                location.pathname === '/templates' 
                  ? 'bg-gray-100 text-cvfacile-primary dark:bg-slate-800 dark:text-blue-400'
                  : ''
              }`} 
              onClick={() => setOpen(false)}
            >
              {t('app.templates')}
            </Link>
            <Link 
              to="/build" 
              className={`py-2 px-3 rounded-md mb-1 transition-colors ${
                location.pathname === '/build' 
                  ? 'bg-gray-100 text-cvfacile-primary dark:bg-slate-800 dark:text-blue-400'
                  : ''
              }`} 
              onClick={() => setOpen(false)}
            >
              {t('app.create')}
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`py-2 px-3 rounded-md mb-1 transition-colors ${
                  location.pathname === '/dashboard' 
                    ? 'bg-gray-100 text-cvfacile-primary dark:bg-slate-800 dark:text-blue-400'
                    : ''
                }`} 
                onClick={() => setOpen(false)}
              >
                {t('app.dashboard')}
              </Link>
            )}
          </nav>

          <div className="flex flex-col gap-2 px-4 pb-6 mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    {language === 'fr' ? 'Français' : 'English'}
                  </div>
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-slate-800 dark:border-slate-700">
                <DropdownMenuItem 
                  onClick={() => setLanguage('fr')}
                  className={language === 'fr' ? 'bg-gray-100 dark:bg-slate-700' : ''}
                >
                  🇫🇷 Français {language === 'fr' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-gray-100 dark:bg-slate-700' : ''}
                >
                  🇺🇸 English {language === 'en' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between gap-2" 
              onClick={toggleTheme}
            >
              <div className="flex items-center gap-2">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {theme === 'dark' ? t('app.light.mode') : t('app.dark.mode')}
              </div>
            </Button>

            {isAuthenticated ? (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2" 
                onClick={() => { logout(); setOpen(false); }}
              >
                <User className="w-4 h-4" /> {t('app.logout')}
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-start gap-2" 
                  asChild 
                  onClick={() => setOpen(false)}
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4" />
                    {language === 'fr' ? t('app.login') : 'Log in'}
                  </Link>
                </Button>
                <Button 
                  className="w-full flex items-center justify-start gap-2 bg-cvfacile-primary hover:opacity-90 dark:bg-blue-600 text-white"
                  asChild 
                  onClick={() => setOpen(false)}
                >
                  <Link to="/register">
                    <UserPlus className="w-4 h-4" />
                    {t('app.signup')}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 glass-effect bg-white/80 backdrop-blur-lg border-b border-gray-100/50 dark:bg-slate-900/80 dark:border-slate-800/50">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <Logo />
        <DesktopNav />
        
        {isMobile ? (
          <>
            <MobileMenuButton />
            <MobileDrawer />
          </>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageDropdown />
            <ThemeToggle />
            <AuthButtons />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;