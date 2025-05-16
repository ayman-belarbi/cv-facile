import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const ProfileSettings = () => {
  const { user, updateProfile, deleteAccount } = useAuth();
  const { t, language } = useLanguage();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  const [isEditNameDialogOpen, setIsEditNameDialogOpen] = useState(false);
  const [isEditEmailDialogOpen, setIsEditEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handlers for dialogs
  const handleNameSave = async () => {
    setLoading(true);
    try {
      await updateProfile({ name: editName });
      setName(editName);
      setIsEditNameDialogOpen(false);
      toast({
        title: t('success'),
        description: t('profile.updated'),
        variant: 'default',
      });
      navigate('/');
    } catch {
      toast({
        title: t('error'),
        description: t('profile.update.failed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  const handleEmailSave = async () => {
    setLoading(true);
    try {
      await updateProfile({ email: editEmail });
      setEmail(editEmail);
      setIsEditEmailDialogOpen(false);
      toast({
        title: t('success'),
        description: t('profile.updated'),
        variant: 'default',
      });
      navigate('/');
    } catch {
      toast({
        title: t('error'),
        description: t('profile.update.failed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast({ title: t('error'), description: t('fill.all.fields'), variant: 'destructive' });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({ title: t('error'), description: t('passwords.not.match'), variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await updateProfile({ password: newPassword, currentPassword });
      setIsPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      toast({
        title: t('success'),
        description: t('password.updated'),
        variant: 'default',
      });
      navigate('/');
    } catch {
      toast({
        title: t('error'),
        description: t('password.update.failed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveAccount = async () => {
    if (deleteConfirm !== 'delete') {
      toast({ title: t('error'), description: t('type.delete.to.confirm'), variant: 'destructive' });
      return;
    }
    setDeleting(true);
    try {
      await deleteAccount();
      setIsRemoveDialogOpen(false);
      toast({
        title: t('success'),
        description: t('account.removed'),
        variant: 'default',
      });
      navigate('/');
    } catch {
      toast({
        title: t('error'),
        description: t('account.remove.failed'),
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
      setDeleteConfirm("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 dark:text-white">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container px-4 mx-auto max-w-2xl">
            <h2 className="mb-10 text-2xl md:text-3xl font-bold text-center font-poppins">
              {t('app.profile.settings')}
            </h2>
            {/* Name Section */}
            <div className="group relative rounded-lg overflow-hidden transition-all duration-300 border bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700 mb-4">
              <div className="p-4 flex items-center gap-2">
                <div className="font-semibold text-lg text-gray-900 dark:text-white w-24">{t('app.name')}</div>
                <div className="flex-1 text-gray-500 dark:text-gray-300">{name}</div>
                <Button onClick={() => { setEditName(name); setIsEditNameDialogOpen(true); }} className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 bg-cvfacile-primary text-white dark:bg-blue-600">{t('change')}</Button>
              </div>
            </div>
            {/* Email Section */}
            <div className="group relative rounded-lg overflow-hidden transition-all duration-300 border bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700 mb-4">
              <div className="p-4 flex items-center gap-2">
                <div className="font-semibold text-lg text-gray-900 dark:text-white w-24">{t('app.email')}</div>
                <div className="flex-1 text-gray-500 dark:text-gray-300">{email}</div>
                <Button onClick={() => { setEditEmail(email); setIsEditEmailDialogOpen(true); }} className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 bg-cvfacile-primary text-white dark:bg-blue-600">{t('change')}</Button>
              </div>
            </div>
            {/* Name Dialog */}
            <Dialog open={isEditNameDialogOpen} onOpenChange={setIsEditNameDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('edit.name')}</DialogTitle>
                  <DialogDescription>{t('edit.name.desc')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">{t('app.name')}</Label>
                    <Input
                      id="edit-name"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 bg-cvfacile-primary text-white dark:bg-blue-600" onClick={handleNameSave} disabled={loading}>{t('save')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Email Dialog */}
            <Dialog open={isEditEmailDialogOpen} onOpenChange={setIsEditEmailDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('edit.email')}</DialogTitle>
                  <DialogDescription>{t('edit.email.desc')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">{t('app.email')}</Label>
                    <Input
                      id="edit-email"
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 bg-cvfacile-primary text-white dark:bg-blue-600" onClick={handleEmailSave} disabled={loading}>{t('save')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Password Section */}
            <div className="group relative rounded-lg overflow-hidden transition-all duration-300 border bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700 mb-4">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="font-medium text-lg">{t('password.section')}</div>
                <Button onClick={() => setIsPasswordDialogOpen(true)} className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 bg-cvfacile-primary text-white dark:bg-blue-600">{t('change')}</Button>
              </div>
            </div>
            {/* Password Dialog */}
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('change.password')}</DialogTitle>
                  <DialogDescription>{t('change.password.desc')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="current-password" className="text-right">{t('current.password')}</Label>
                    <div className="relative col-span-3">
                      <Input
                        id="current-password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        tabIndex={-1}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="new-password" className="text-right">{t('new.password')}</Label>
                    <div className="relative col-span-3">
                      <Input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        tabIndex={-1}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="confirm-new-password" className="text-right">{t('confirm.new.password')}</Label>
                    <div className="relative col-span-3">
                      <Input
                        id="confirm-new-password"
                        type={showConfirmNewPassword ? 'text' : 'password'}
                        value={confirmNewPassword}
                        onChange={e => setConfirmNewPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        tabIndex={-1}
                      >
                        {showConfirmNewPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" className="px-3 py-2 text-sm font-medium rounded-md transition-all duration-500 hover:scale-105 bg-cvfacile-primary text-white dark:bg-blue-600" onClick={handlePasswordSave} disabled={loading}>{t('change')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            {/* Remove Account Section */}
            <div className="group relative rounded-lg overflow-hidden transition-all duration-300 border bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 dark:border-slate-700">
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="font-medium text-lg text-red-600">{t('remove.account')}</div>
                <Button onClick={() => setIsRemoveDialogOpen(true)} variant="destructive" className="px-3 py-2">{t('remove')}</Button>
              </div>
            </div>
            {/* Remove Account Dialog */}
            <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('remove.account')}</DialogTitle>
                  <DialogDescription>{t('remove.account.desc')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    id="delete-confirm"
                    value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    placeholder={t('type.delete.to.confirm')}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="destructive" className="px-3 py-2" onClick={handleRemoveAccount} disabled={deleting}>{t('remove')}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileSettings;