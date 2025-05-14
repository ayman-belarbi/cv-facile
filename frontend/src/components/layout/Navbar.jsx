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

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isMobile = useMobile();
  const [open, setOpen] = React.useState(false);

  // Logo Component
  const Logo = () => (
        <div className="flex items-center space-x-2">
          <FileUser className={`w-8 h-8 ${theme === 'dark' ? 'text-cvfacile-accent' : 'text-cvfacile-primary'}`} />
          <Link to="/" className={`text-xl font-bold font-poppins ${theme === 'dark' ? 'text-white' : 'text-gradient-primary'}`}>
            {language === 'fr' ? 'CV Facile' : 'Easy CV'}
          </Link>
        </div>
  );
        
  // Desktop Navigation Links
  const DesktopNav = () => (
        <nav className="hidden space-x-6 text-sm font-medium md:flex">
          <Link to="/" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.home')}
          </Link>
          <Link to="/templates" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.templates')}
          </Link>
          <Link to="/build" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
            {t('app.create')}
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-colors hover:text-cvfacile-primary`}>
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
          className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-white`}
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
  );

  // Theme Toggle Button
  const ThemeToggle = () => (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
      className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-white`}
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
              className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} flex items-center hover:text-white`}
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
      );
    }

    return (
            <>
              <Button 
                variant="ghost" 
                asChild 
          className={`hidden sm:inline-flex ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-white`}
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
          <Link to="/register">
            <UserPlus className="w-4 h-4 mr-2" />
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
      className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} hover:text-white md:hidden`}
    >
      <Menu className="w-6 h-6" />
    </Button>
  );

  // Mobile Drawer
  const MobileDrawer = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <Logo />
          </div>
          
          <nav className="flex flex-col space-y-2 px-4 py-6">
            <Link to="/" className="py-2 text-base font-medium" onClick={() => setOpen(false)}>
              {t('app.home')}
            </Link>
            <Link to="/templates" className="py-2 text-base font-medium" onClick={() => setOpen(false)}>
              {t('app.templates')}
            </Link>
            <Link to="/build" className="py-2 text-base font-medium" onClick={() => setOpen(false)}>
              {t('app.create')}
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="py-2 text-base font-medium" onClick={() => setOpen(false)}>
                {t('app.dashboard')}
              </Link>
            )}
          </nav>

          <div className="flex flex-col gap-2 px-4 pb-6 mt-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-start gap-2">
                  <Languages className="w-5 h-5" />
                  {language === 'fr' ? 'Français' : 'English'}
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
              variant="outline" 
              className="w-full flex items-center justify-start gap-2" 
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {theme === 'dark' ? t('app.light.mode') : t('app.dark.mode')}
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
                  className="w-full flex items-center justify-start gap-2 hover:text-white" 
                  asChild 
                  onClick={() => setOpen(false)}
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4" />
                    {t('app.login')}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-start gap-2" 
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
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <Logo />
        <DesktopNav />
        
        {isMobile ? (
          <>
            <MobileMenuButton />
            <MobileDrawer />
          </>
        ) : (
          <div className="flex items-center space-x-2 sm:space-x-4">
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