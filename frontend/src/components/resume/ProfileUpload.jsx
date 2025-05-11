import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, User } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

const ProfileUpload = ({ onImageChange, currentImage }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const { theme } = useTheme();
  const { language } = useLanguage();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'fr' ? 'Veuillez sélectionner une image valide.' : 'Please select a valid image.');
        return;
      }

    if (file.size > 5 * 1024 * 1024) {
      alert(language === 'fr' ? 'L\'image est trop volumineuse. Maximum 5MB.' : 'Image is too large. Maximum 5MB.');
        return;
      }

      const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(e.target.result);
      };
      reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={`relative flex-1 border-2 border-dashed rounded-lg p-4 text-center transition-all duration-200 ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary/50'
        } ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
            {currentImage ? (
              <img
                src={currentImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
        </div>
        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {currentImage 
            ? (language === 'fr' ? 'Cliquez pour changer la photo' : 'Click to change photo')
            : (language === 'fr' ? 'Cliquez pour ajouter une photo' : 'Click to add photo')
          }
        </p>
          <input
          ref={fileInputRef}
            type="file"
          accept="image/*"
          onChange={handleFileInput}
            className="hidden"
          />
      </div>
        </div>
  );
};

export default ProfileUpload;
