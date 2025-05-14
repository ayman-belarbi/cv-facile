import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ResumeData } from "@/lib/resumeData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import ProfileUpload from "./ProfileUpload";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const isMobile = useMobile();
  const { language } = useLanguage();
  
  // Initialize form state with default values
  const [newSkill, setNewSkill] = useState({ name: "", level: 1 });
  const [newLanguage, setNewLanguage] = useState({ 
    name: "", 
    level: language === 'fr' ? "Intermédiaire" : "Intermediate" 
  });
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [""]
  });
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: ""
  });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiry: ""
  });
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editingCertificationId, setEditingCertificationId] = useState(null);
  const [editingExperienceId, setEditingExperienceId] = useState(null);
  const [editingLanguageId, setEditingLanguageId] = useState(null);
  const [editingEducationId, setEditingEducationId] = useState(null);

  // Ensure personal info values are always defined
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value || ""
      }
    }));
  };

  const handleProfileImageChange = (imageUrl) => {
    updatePersonalInfo("profileImage", imageUrl);
  };

  const addExperience = () => {
    if (!newExperience.company || !newExperience.position) {
      toast.error(language === 'fr' ? "Veuillez remplir l'entreprise et le poste" : "Please fill in the company and position");
      return;
    }

    const experience = {
      ...newExperience,
      id: uuidv4(),
      achievements: newExperience.achievements.filter((a) => a.trim() !== ""),
    };

    setResumeData({
      ...resumeData,
      experiences: [...(resumeData.experiences || []), experience],
    });

    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    });

    toast.success(language === 'fr' ? "Expérience ajoutée avec succès" : "Experience added successfully");
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experiences: (resumeData.experiences || []).filter((exp) => exp.id !== id),
    });
    toast.success(language === 'fr' ? "Expérience supprimée" : "Experience removed");
  };

  const updateExperienceAchievement = (index, value) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements[index] = value;
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements,
    });
  };

  const addAchievementField = () => {
    setNewExperience({
      ...newExperience,
      achievements: [...newExperience.achievements, ""],
    });
  };

  const removeAchievementField = (index) => {
    if (newExperience.achievements.length > 1) {
      const updatedAchievements = [...newExperience.achievements];
      updatedAchievements.splice(index, 1);
      setNewExperience({
        ...newExperience,
        achievements: updatedAchievements,
      });
    }
  };

  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree) {
      toast.error(language === 'fr' ? "Veuillez remplir l'établissement et le diplôme" : "Please fill in the institution and degree");
      return;
    }

    const education = {
      ...newEducation,
      id: uuidv4(),
    };

    setResumeData({
      ...resumeData,
      education: [...(resumeData.education || []), education],
    });

    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });

    toast.success(language === 'fr' ? "Formation ajoutée avec succès" : "Education added successfully");
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: (resumeData.education || []).filter((edu) => edu.id !== id),
    });
    toast.success(language === 'fr' ? "Formation supprimée" : "Education removed");
  };

  const addSkill = () => {
    if (!newSkill.name) {
      toast.error(language === 'fr' ? "Veuillez entrer le nom de la compétence" : "Please enter the skill name");
      return;
    }

    const skill = {
      id: uuidv4(),
      name: newSkill.name,
      level: newSkill.level,
    };

    setResumeData({
      ...resumeData,
      skills: [...(resumeData.skills || []), skill],
    });

    setNewSkill({ name: "", level: 1 });
    toast.success(language === 'fr' ? "Compétence ajoutée" : "Skill added");
  };

  const removeSkill = (id) => {
    setResumeData({
      ...resumeData,
      skills: (resumeData.skills || []).filter((skill) => skill.id !== id),
    });
    toast.success(language === 'fr' ? "Compétence supprimée" : "Skill removed");
  };

  const addLanguage = () => {
    if (!newLanguage.name) {
      toast.error(language === 'fr' ? "Veuillez entrer le nom de la langue" : "Please enter the language name");
      return;
    }

    const languageItem = {
      id: uuidv4(),
      name: newLanguage.name,
      level: newLanguage.level,
    };

    setResumeData({
      ...resumeData,
      languages: [...(resumeData.languages || []), languageItem],
    });

    setNewLanguage({ name: "", level: language === 'fr' ? "Intermédiaire" : "Intermediate" });
    toast.success(language === 'fr' ? "Langue ajoutée" : "Language added");
  };

  const removeLanguage = (id) => {
    setResumeData({
      ...resumeData,
      languages: (resumeData.languages || []).filter((lang) => lang.id !== id),
    });
    toast.success(language === 'fr' ? "Langue supprimée" : "Language removed");
  };

  const addCertification = () => {
    if (!newCertification.name || !newCertification.issuer) {
      toast.error(language === 'fr' ? "Veuillez remplir le nom et l'émetteur de la certification" : "Please fill in the certification name and issuer");
      return;
    }

    const certification = {
      ...newCertification,
      id: uuidv4(),
    };

    setResumeData({
      ...resumeData,
      certifications: [...(resumeData.certifications || []), certification],
    });

    setNewCertification({
      name: "",
      issuer: "",
      date: "",
      expiry: "",
    });

    toast.success(language === 'fr' ? "Certification ajoutée avec succès" : "Certification added successfully");
  };

  const removeCertification = (id) => {
    setResumeData({
      ...resumeData,
      certifications: (resumeData.certifications || []).filter((cert) => cert.id !== id),
    });
    toast.success(language === 'fr' ? "Certification supprimée" : "Certification removed");
  };

  const addOrUpdateSkill = () => {
    if (!newSkill.name) {
      toast.error(language === 'fr' ? "Veuillez entrer le nom de la compétence" : "Please enter the skill name");
      return;
    }
    if (editingSkillId) {
      setResumeData({
        ...resumeData,
        skills: resumeData.skills.map(skill =>
          skill.id === editingSkillId ? { ...skill, ...newSkill } : skill
        ),
      });
      setEditingSkillId(null);
      toast.success(language === 'fr' ? "Compétence modifiée" : "Skill updated");
    } else {
      const skill = {
        id: uuidv4(),
        name: newSkill.name,
        level: newSkill.level,
      };
      setResumeData({
        ...resumeData,
        skills: [...(resumeData.skills || []), skill],
      });
      toast.success(language === 'fr' ? "Compétence ajoutée" : "Skill added");
    }
    setNewSkill({ name: "", level: 1 });
  };

  const addOrUpdateCertification = () => {
    if (!newCertification.name || !newCertification.issuer) {
      toast.error(language === 'fr' ? "Veuillez remplir le nom et l'émetteur de la certification" : "Please fill in the certification name and issuer");
      return;
    }
    if (editingCertificationId) {
      setResumeData({
        ...resumeData,
        certifications: resumeData.certifications.map(cert =>
          cert.id === editingCertificationId ? { ...cert, ...newCertification } : cert
        ),
      });
      setEditingCertificationId(null);
      toast.success(language === 'fr' ? "Certification modifiée" : "Certification updated");
    } else {
      const certification = {
        ...newCertification,
        id: uuidv4(),
      };
      setResumeData({
        ...resumeData,
        certifications: [...(resumeData.certifications || []), certification],
      });
      toast.success(language === 'fr' ? "Certification ajoutée avec succès" : "Certification added successfully");
    }
    setNewCertification({ name: "", issuer: "", date: "", expiry: "" });
  };

  const addOrUpdateExperience = () => {
    if (!newExperience.company || !newExperience.position) {
      toast.error(language === 'fr' ? "Veuillez remplir l'entreprise et le poste" : "Please fill in the company and position");
      return;
    }
    if (editingExperienceId) {
      setResumeData({
        ...resumeData,
        experiences: resumeData.experiences.map(exp =>
          exp.id === editingExperienceId ? { ...exp, ...newExperience, achievements: newExperience.achievements.filter((a) => a.trim() !== "") } : exp
        ),
      });
      setEditingExperienceId(null);
      toast.success(language === 'fr' ? "Expérience modifiée" : "Experience updated");
    } else {
      const experience = {
        ...newExperience,
        id: uuidv4(),
        achievements: newExperience.achievements.filter((a) => a.trim() !== ""),
      };
      setResumeData({
        ...resumeData,
        experiences: [...(resumeData.experiences || []), experience],
      });
      toast.success(language === 'fr' ? "Expérience ajoutée avec succès" : "Experience added successfully");
    }
    setNewExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""]
    });
  };

  const addOrUpdateLanguage = () => {
    if (!newLanguage.name) {
      toast.error(language === 'fr' ? "Veuillez entrer le nom de la langue" : "Please enter the language name");
      return;
    }
    if (editingLanguageId) {
      setResumeData({
        ...resumeData,
        languages: resumeData.languages.map(lang =>
          lang.id === editingLanguageId ? { ...lang, ...newLanguage } : lang
        ),
      });
      setEditingLanguageId(null);
      toast.success(language === 'fr' ? "Langue modifiée" : "Language updated");
    } else {
      const languageItem = {
        ...newLanguage,
        id: uuidv4(),
      };
      setResumeData({
        ...resumeData,
        languages: [...(resumeData.languages || []), languageItem],
      });
      toast.success(language === 'fr' ? "Langue ajoutée" : "Language added");
    }
    setNewLanguage({ name: "", level: language === 'fr' ? "Intermédiaire" : "Intermediate" });
  };

  const addOrUpdateEducation = () => {
    if (!newEducation.institution || !newEducation.degree) {
      toast.error(language === 'fr' ? "Veuillez remplir l'institution et le diplôme" : "Please fill in the institution and degree");
      return;
    }
    if (editingEducationId) {
      setResumeData({
        ...resumeData,
        education: resumeData.education.map(edu =>
          edu.id === editingEducationId ? { ...edu, ...newEducation } : edu
        ),
      });
      setEditingEducationId(null);
      toast.success(language === 'fr' ? "Formation modifiée" : "Education updated");
    } else {
      const education = {
        ...newEducation,
        id: uuidv4(),
      };
      setResumeData({
        ...resumeData,
        education: [...(resumeData.education || []), education],
      });
      toast.success(language === 'fr' ? "Formation ajoutée avec succès" : "Education added successfully");
    }
    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  return (
    <Card className="w-full overflow-hidden border">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} overflow-x-auto`}>
          <TabsTrigger value="personal">{language === 'fr' ? 'Infos Pers' : 'Personal Info'}</TabsTrigger>
          <TabsTrigger value="experience">{language === 'fr' ? 'Expérience' : 'Experience'}</TabsTrigger>
          <TabsTrigger value="education">{language === 'fr' ? 'Formation' : 'Education'}</TabsTrigger>
          <TabsTrigger value="skills">{language === 'fr' ? 'Compétences' : 'Skills'}</TabsTrigger>
          <TabsTrigger value="languages">{language === 'fr' ? 'Langues' : 'Languages'}</TabsTrigger>
          <TabsTrigger value="certifications">{language === 'fr' ? 'Certifications' : 'Certifications'}</TabsTrigger>
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="personal" className="p-4 space-y-4">
          <ProfileUpload 
            currentImage={resumeData.personalInfo.profileImage || null} 
            onImageChange={handleProfileImageChange} 
          />
          
          <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Prénom' : 'First Name'}</label>
              <Input
                value={resumeData.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                placeholder={language === 'fr' ? 'Votre prénom' : 'Your first name'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Nom' : 'Last Name'}</label>
              <Input
                value={resumeData.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                placeholder={language === 'fr' ? 'Votre nom' : 'Your last name'}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Titre professionnel' : 'Professional Title'}</label>
            <Input
              value={resumeData.personalInfo.title}
              onChange={(e) => updatePersonalInfo("title", e.target.value)}
              placeholder={language === 'fr' ? 'ex: Développeur Web' : 'ex: Web Developer'}
            />
          </div>

          <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Email' : 'Email'}</label>
              <Input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder={language === 'fr' ? 'votre@email.com' : 'your@email.com'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Téléphone' : 'Phone'}</label>
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder={language === 'fr' ? 'Votre numéro' : 'Your number'}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Adresse' : 'Address'}</label>
            <Input
              value={resumeData.personalInfo.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              placeholder={language === 'fr' ? 'Votre adresse' : 'Your address'}
            />
          </div>

          <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Site Web (optionnel)' : 'Website (optional)'}</label>
              <Input
                value={resumeData.personalInfo.website}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                placeholder={language === 'fr' ? 'www.monsite.com' : 'www.yoursite.com'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'LinkedIn (optionnel)' : 'LinkedIn (optional)'}</label>
              <Input
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                placeholder={language === 'fr' ? 'linkedin.com/in/monprofil' : 'linkedin.com/in/yourprofile'}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Résumé professionnel' : 'Professional Summary'}</label>
            <Textarea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder={language === 'fr' ? 'Décrivez brièvement votre profil et vos objectifs professionnels' : 'Describe briefly your professional profile and career goals'}
              rows={4}
            />
          </div>
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience" className="p-4 space-y-4">
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">{language === 'fr' ? 'Nouvelle expérience' : 'New Experience'}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Entreprise' : 'Company'}</label>
                <Input
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder={language === 'fr' ? 'Nom de l\'entreprise' : 'Company name'}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Poste' : 'Position'}</label>
                <Input
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder={language === 'fr' ? 'Titre du poste' : 'Position title'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Date de début' : 'Start Date'}</label>
                <Input
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  placeholder={language === 'fr' ? 'Jan 2022' : 'Jan 2022'}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Date de fin' : 'End Date'}</label>
                <Input
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  placeholder={language === 'fr' ? 'Présent' : 'Present'}
                  disabled={newExperience.current}
                />
              </div>
              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id="current-job"
                  checked={newExperience.current}
                  onChange={(e) => 
                    setNewExperience({ 
                      ...newExperience, 
                      current: e.target.checked,
                      endDate: e.target.checked ? "" : newExperience.endDate
                    })
                  }
                  className="w-4 h-4 mr-2 border-gray-300 rounded"
                />
                <label htmlFor="current-job" className="text-sm">{language === 'fr' ? 'Poste actuel' : 'Current position'}</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Description' : 'Description'}</label>
              <Textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder={language === 'fr' ? 'Décrivez vos responsabilités et votre rôle' : 'Describe your responsibilities and role'}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Réalisations' : 'Achievements'}</label>
              {newExperience.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateExperienceAchievement(index, e.target.value)}
                    placeholder={language === 'fr' ? 'Une réalisation...' : 'An achievement...'}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAchievementField(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAchievementField}
                className="flex items-center mt-2 hover:text-white"
              >
                <Plus className="w-4 h-4 mr-1" /> {language === 'fr' ? 'Ajouter une réalisation' : 'Add achievement'}
              </Button>
            </div>

            <Button 
              onClick={addOrUpdateExperience}
              className="w-full mt-2 bg-cvfacile-primary hover:bg-cvfacile-primary/90"
            >
              {editingExperienceId
                ? (language === 'fr' ? 'Mettre à jour cette expérience' : 'Update this experience')
                : (language === 'fr' ? 'Ajouter cette expérience' : 'Add this experience')}
            </Button>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">{language === 'fr' ? 'Expériences ajoutées' : 'Added Experiences'}</h3>
            {!resumeData.experiences || !Array.isArray(resumeData.experiences) || resumeData.experiences.length === 0 ? (
              <p className="text-gray-500">{language === 'fr' ? 'Aucune expérience ajoutée' : 'No experience added'}</p>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {resumeData.experiences.map((exp) => (
                  <AccordionItem key={exp.id} value={exp.id} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div>
                        <div className="font-medium">{exp.position}</div>
                        <div className="text-sm text-gray-600">{exp.company}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1">
                      <div className="mb-2 text-sm">
                        <span className="font-medium">{language === 'fr' ? 'Période' : 'Period'}: </span> 
                        {exp.startDate} - {exp.current ? (language === 'fr' ? 'Présent' : 'Present') : exp.endDate}
                      </div>
                      <p className="mb-2 text-sm">{exp.description}</p>
                      
                      {exp.achievements && Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                        <div className="mb-3">
                          <div className="mb-1 text-sm font-medium">{language === 'fr' ? 'Réalisations:' : 'Achievements:'}</div>
                          <ul className="pl-5 text-sm list-disc">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNewExperience({
                              company: exp.company,
                              position: exp.position,
                              startDate: exp.startDate,
                              endDate: exp.endDate,
                              current: exp.current,
                              description: exp.description,
                              achievements: exp.achievements
                            });
                            setEditingExperienceId(exp.id);
                          }}
                          className="hover:text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeExperience(exp.id)}
                          className="flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> {language === 'fr' ? 'Supprimer' : 'Remove'}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education" className="p-4 space-y-4">
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">{language === 'fr' ? 'Nouvelle formation' : 'New Education'}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Établissement' : 'Institution'}</label>
                <Input
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder={language === 'fr' ? 'Nom de l\'établissement' : 'Institution name'}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Domaine d\'études' : 'Field of Study'}</label>
                <Input
                  value={newEducation.field}
                  onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                  placeholder={language === 'fr' ? 'Votre domaine d\'études' : 'Your field of study'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Date de début' : 'Start Date'}</label>
                <Input
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  placeholder={language === 'fr' ? 'Sep 2018' : 'Sep 2018'}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Date de fin' : 'End Date'}</label>
                <Input
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  placeholder={language === 'fr' ? 'Juin 2022' : 'Jun 2022'}
                  disabled={newEducation.current}
                />
              </div>
              <div className="flex items-center pt-8">
                <input
                  type="checkbox"
                  id="current-education"
                  checked={newEducation.current}
                  onChange={(e) => 
                    setNewEducation({ 
                      ...newEducation, 
                      current: e.target.checked,
                      endDate: e.target.checked ? "" : newEducation.endDate
                    })
                  }
                  className="w-4 h-4 mr-2 border-gray-300 rounded"
                />
                <label htmlFor="current-education" className="text-sm">{language === 'fr' ? 'En cours' : 'Currently studying'}</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Description' : 'Description'}</label>
              <Textarea
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                placeholder={language === 'fr' ? 'Informations supplémentaires sur votre formation' : 'Additional information about your education'}
                rows={3}
              />
            </div>

            <Button 
              onClick={addOrUpdateEducation}
              className="w-full mt-2 bg-cvfacile-primary hover:bg-cvfacile-primary/90"
            >
              {editingEducationId
                ? (language === 'fr' ? 'Mettre à jour cette formation' : 'Update this education')
                : (language === 'fr' ? 'Ajouter cette formation' : 'Add this education')}
            </Button>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">{language === 'fr' ? 'Formations ajoutées' : 'Added Educations'}</h3>
            {!resumeData.education || !Array.isArray(resumeData.education) || resumeData.education.length === 0 ? (
              <p className="text-gray-500">{language === 'fr' ? 'Aucune formation ajoutée' : 'No education added'}</p>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {resumeData.education.map((edu) => (
                  <AccordionItem key={edu.id} value={edu.id} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div>
                        <div className="font-medium">{edu.institution}</div>
                        <div className="text-sm text-gray-600">{edu.field}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1">
                      <div className="mb-2 text-sm">
                        <span className="font-medium">{language === 'fr' ? 'Période' : 'Period'}: </span> 
                        {edu.startDate} - {edu.current ? (language === 'fr' ? 'En cours' : 'Currently studying') : edu.endDate}
                      </div>
                      {edu.description && <p className="mb-3 text-sm">{edu.description}</p>}
                      
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setNewEducation({
                              institution: edu.institution,
                              field: edu.field,
                              startDate: edu.startDate,
                              endDate: edu.endDate,
                              current: edu.current,
                              description: edu.description
                            });
                            setEditingEducationId(edu.id);
                          }}
                          className="hover:text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEducation(edu.id)}
                          className="flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" /> {language === 'fr' ? 'Supprimer' : 'Remove'}
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills" className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Compétence' : 'Skill'}</label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder={language === 'fr' ? 'ex: JavaScript, Gestion de projet, etc.' : 'ex: JavaScript, Project Management, etc.'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Niveau' : 'Level'}</label>
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cvfacile-primary
                  bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <option value="1">{language === 'fr' ? 'Débutant' : 'Beginner'}</option>
                <option value="2">{language === 'fr' ? 'Intermédiaire' : 'Intermediate'}</option>
                <option value="3">{language === 'fr' ? 'Avancé' : 'Advanced'}</option>
                <option value="4">{language === 'fr' ? 'Expert' : 'Expert'}</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={addOrUpdateSkill}
            className="w-full bg-cvfacile-primary hover:bg-cvfacile-primary/90"
          >
            {editingSkillId
              ? (language === 'fr' ? 'Mettre à jour la compétence' : 'Update skill')
              : (language === 'fr' ? 'Ajouter cette compétence' : 'Add this skill')}
          </Button>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">{language === 'fr' ? 'Compétences ajoutées' : 'Added Skills'}</h3>
            {!resumeData.skills || !Array.isArray(resumeData.skills) || resumeData.skills.length === 0 ? (
              <p className="text-gray-500">{language === 'fr' ? 'Aucune compétence ajoutée' : 'No skill added'}</p>
            ) : (
              <div className="space-y-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="mb-1 font-medium">{skill.name}</div>
                      <div className="flex items-center">
                        <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-full bg-cvfacile-primary rounded-full"
                            style={{ width: `${(skill.level / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{skill.level}/4</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewSkill({ name: skill.name, level: skill.level });
                          setEditingSkillId(skill.id);
                        }}
                        className="ml-5 hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeSkill(skill.id)}
                        className="flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> {language === 'fr' ? 'Supprimer' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Languages */}
        <TabsContent value="languages" className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Langue' : 'Language'}</label>
              <Input
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                placeholder={language === 'fr' ? 'ex: Français, Anglais, etc.' : 'ex: French, English, etc.'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Niveau' : 'Level'}</label>
              <select
                value={newLanguage.level}
                onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cvfacile-primary
                  bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <option value={language === 'fr' ? 'Débutant' : 'Beginner'}>{language === 'fr' ? 'Débutant' : 'Beginner'}</option>
                <option value={language === 'fr' ? 'Intermédiaire' : 'Intermediate'}>{language === 'fr' ? 'Intermédiaire' : 'Intermediate'}</option>
                <option value={language === 'fr' ? 'Avancé' : 'Advanced'}>{language === 'fr' ? 'Avancé' : 'Advanced'}</option>
                <option value={language === 'fr' ? 'Courant' : 'Fluent'}>{language === 'fr' ? 'Courant' : 'Fluent'}</option>
                <option value={language === 'fr' ? 'Bilingue' : 'Bilingual'}>{language === 'fr' ? 'Bilingue' : 'Bilingual'}</option>
                <option value={language === 'fr' ? 'Natif' : 'Native'}>{language === 'fr' ? 'Natif' : 'Native'}</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={addOrUpdateLanguage}
            className="w-full bg-cvfacile-primary hover:bg-cvfacile-primary/90"
          >
            {editingLanguageId
              ? (language === 'fr' ? 'Mettre à jour cette langue' : 'Update this language')
              : (language === 'fr' ? 'Ajouter cette langue' : 'Add this language')}
          </Button>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">{language === 'fr' ? 'Langues ajoutées' : 'Added Languages'}</h3>
            {!resumeData.languages || !Array.isArray(resumeData.languages) || resumeData.languages.length === 0 ? (
              <p className="text-gray-500">{language === 'fr' ? 'Aucune langue ajoutée' : 'No language added'}</p>
            ) : (
              <div className="space-y-2">
                {resumeData.languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-gray-600">{language.level}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewLanguage({
                            name: language.name,
                            level: language.level
                          });
                          setEditingLanguageId(language.id);
                        }}
                        className="hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeLanguage(language.id)}
                        className="flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> {language === 'fr' ? 'Supprimer' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Certifications */}
        <TabsContent value="certifications" className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Nom du certificat' : 'Certification Name'}</label>
              <Input
                value={newCertification.name}
                onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                placeholder={language === 'fr' ? 'ex: AWS Certified Developer' : 'ex: AWS Certified Developer'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Émetteur' : 'Issuer'}</label>
              <Input
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                placeholder={language === 'fr' ? 'ex: Amazon Web Services' : 'ex: Amazon Web Services'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Date d\'obtention' : 'Date Obtained'}</label>
              <Input
                value={newCertification.date}
                onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                placeholder={language === 'fr' ? 'Juin 2023' : 'Jun 2023'}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">{language === 'fr' ? 'Date d\'expiration' : 'Expiry Date'}</label>
              <Input
                value={newCertification.expiry}
                onChange={(e) => setNewCertification({ ...newCertification, expiry: e.target.value })}
                placeholder={language === 'fr' ? 'Juin 2025' : 'Jun 2025'}
              />
            </div>
          </div>

          <Button 
            onClick={addOrUpdateCertification}
            className="w-full mt-2 bg-cvfacile-primary hover:bg-cvfacile-primary/90"
          >
            {editingCertificationId
              ? (language === 'fr' ? 'Mettre à jour cette certification' : 'Update this certification')
              : (language === 'fr' ? 'Ajouter cette certification' : 'Add this certification')}
          </Button>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">{language === 'fr' ? 'Certifications ajoutées' : 'Added Certifications'}</h3>
            {!resumeData.certifications || !Array.isArray(resumeData.certifications) || resumeData.certifications.length === 0 ? (
              <p className="text-gray-500">{language === 'fr' ? 'Aucune certification ajoutée' : 'No certification added'}</p>
            ) : (
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">
                        {cert.date} {cert.expiry ? ` - ${cert.expiry}` : ""}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewCertification({
                            name: cert.name,
                            issuer: cert.issuer,
                            date: cert.date,
                            expiry: cert.expiry
                          });
                          setEditingCertificationId(cert.id);
                        }}
                        className="hover:text-white"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeCertification(cert.id)}
                        className="flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> {language === 'fr' ? 'Supprimer' : 'Remove'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ResumeForm;