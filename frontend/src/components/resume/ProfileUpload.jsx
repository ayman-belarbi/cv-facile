import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, UserCircle } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const ProfileUpload = ({ profileImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(profileImage);
  const fileInputRef = useRef(null);
  const isMobile = useMobile();

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("L'image est trop volumineuse. Maximum 5MB.");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Veuillez sélectionner une image valide.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setPreviewUrl(result);
        onImageChange(result);
        toast.success("Photo de profil mise à jour");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success("Photo de profil supprimée");
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className={`${isMobile ? 'w-24 h-24' : 'w-32 h-32'} border-2 border-cvfacile-primary`}>
            {previewUrl ? (
              <AvatarImage src={previewUrl} alt="Photo de profil" />
            ) : (
              <AvatarFallback className="bg-cvfacile-primary/10 text-cvfacile-primary">
                <UserCircle className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`} />
              </AvatarFallback>
            )}
          </Avatar>
          
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleUploadClick}
              className="flex items-center justify-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isMobile ? 'Upload' : 'Télécharger'}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleRemoveImage}
              disabled={!previewUrl}
              className="flex items-center justify-center"
            >
              Supprimer
            </Button>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg, image/png, image/gif, image/webp"
          />
          
          <p className="text-xs text-gray-500 text-center">
            Formats acceptés: JPG, PNG, GIF, WebP (max 5MB)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileUpload;
