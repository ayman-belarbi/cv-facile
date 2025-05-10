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
import ProfileUpload from "./ProfileUpload";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const isMobile = useMobile();
  const [newSkill, setNewSkill] = useState({ name: "", level: 3 });
  const [newLanguage, setNewLanguage] = useState({ name: "", level: "Intermédiaire" });
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [""],
  });
  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    expiry: "",
  });

  const updatePersonalInfo = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const handleProfileImageChange = (imageUrl) => {
    updatePersonalInfo("profileImage", imageUrl);
  };

  const addExperience = () => {
    if (!newExperience.company || !newExperience.position) {
      toast.error("Veuillez remplir l'entreprise et le poste");
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

    toast.success("Expérience ajoutée avec succès");
  };

  const removeExperience = (id) => {
    setResumeData({
      ...resumeData,
      experiences: (resumeData.experiences || []).filter((exp) => exp.id !== id),
    });
    toast.success("Expérience supprimée");
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

  // Formation
  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree) {
      toast.error("Veuillez remplir l'établissement et le diplôme");
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

    toast.success("Formation ajoutée avec succès");
  };

  const removeEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: (resumeData.education || []).filter((edu) => edu.id !== id),
    });
    toast.success("Formation supprimée");
  };

  // Compétences
  const addSkill = () => {
    if (!newSkill.name) {
      toast.error("Veuillez entrer le nom de la compétence");
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

    setNewSkill({ name: "", level: 3 });
    toast.success("Compétence ajoutée");
  };

  const removeSkill = (id) => {
    setResumeData({
      ...resumeData,
      skills: (resumeData.skills || []).filter((skill) => skill.id !== id),
    });
    toast.success("Compétence supprimée");
  };

  // Langues
  const addLanguage = () => {
    if (!newLanguage.name) {
      toast.error("Veuillez entrer le nom de la langue");
      return;
    }

    const language = {
      id: uuidv4(),
      name: newLanguage.name,
      level: newLanguage.level,
    };

    setResumeData({
      ...resumeData,
      languages: [...(resumeData.languages || []), language],
    });

    setNewLanguage({ name: "", level: "Intermédiaire" });
    toast.success("Langue ajoutée");
  };

  const removeLanguage = (id) => {
    setResumeData({
      ...resumeData,
      languages: (resumeData.languages || []).filter((lang) => lang.id !== id),
    });
    toast.success("Langue supprimée");
  };

  // Certifications
  const addCertification = () => {
    if (!newCertification.name || !newCertification.issuer) {
      toast.error("Veuillez remplir le nom et l'émetteur du certificat");
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

    toast.success("Certification ajoutée avec succès");
  };

  const removeCertification = (id) => {
    setResumeData({
      ...resumeData,
      certifications: (resumeData.certifications || []).filter((cert) => cert.id !== id),
    });
    toast.success("Certification supprimée");
  };

  return (
    <Card className="w-full overflow-hidden border shadow-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} overflow-x-auto`}>
          <TabsTrigger value="personal">Personnel</TabsTrigger>
          <TabsTrigger value="experience">Expérience</TabsTrigger>
          <TabsTrigger value="education">Formation</TabsTrigger>
          <TabsTrigger value="skills">Compétences</TabsTrigger>
          <TabsTrigger value="languages">Langues</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        {/* Informations personnelles */}
        <TabsContent value="personal" className="p-4 space-y-4">
          <ProfileUpload 
            profileImage={resumeData.personalInfo.profileImage || null} 
            onImageChange={handleProfileImageChange} 
          />
          
          <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
            <div>
              <label className="block mb-1 text-sm font-medium">Prénom</label>
              <Input
                value={resumeData.personalInfo.firstName}
                onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
                placeholder="Prénom"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Nom</label>
              <Input
                value={resumeData.personalInfo.lastName}
                onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
                placeholder="Nom"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Titre professionnel</label>
            <Input
              value={resumeData.personalInfo.title}
              onChange={(e) => updatePersonalInfo("title", e.target.value)}
              placeholder="ex: Développeur Full Stack"
            />
          </div>

          <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="email@exemple.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Téléphone</label>
              <Input
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Adresse</label>
            <Input
              value={resumeData.personalInfo.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              placeholder="Ville, Pays"
            />
          </div>

          <div className={`grid grid-cols-1 gap-4 ${!isMobile ? 'md:grid-cols-2' : ''}`}>
            <div>
              <label className="block mb-1 text-sm font-medium">Site Web (optionnel)</label>
              <Input
                value={resumeData.personalInfo.website}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                placeholder="www.monsite.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">LinkedIn (optionnel)</label>
              <Input
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                placeholder="linkedin.com/in/monprofil"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Résumé professionnel</label>
            <Textarea
              value={resumeData.personalInfo.summary}
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              placeholder="Décrivez brièvement votre profil et vos objectifs professionnels"
              rows={4}
            />
          </div>
        </TabsContent>

        {/* Expérience */}
        <TabsContent value="experience" className="p-4 space-y-4">
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">Nouvelle expérience</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium">Entreprise</label>
                <Input
                  value={newExperience.company}
                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                  placeholder="Nom de l'entreprise"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Poste</label>
                <Input
                  value={newExperience.position}
                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                  placeholder="Titre du poste"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-1 text-sm font-medium">Date de début</label>
                <Input
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                  placeholder="Jan 2022"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Date de fin</label>
                <Input
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                  placeholder="Présent"
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
                <label htmlFor="current-job" className="text-sm">Poste actuel</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Description</label>
              <Textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                placeholder="Décrivez vos responsabilités et votre rôle"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block mb-1 text-sm font-medium">Réalisations</label>
              {newExperience.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={achievement}
                    onChange={(e) => updateExperienceAchievement(index, e.target.value)}
                    placeholder={`Réalisation ${index + 1}`}
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
                className="flex items-center mt-2"
              >
                <Plus className="w-4 h-4 mr-1" /> Ajouter une réalisation
              </Button>
            </div>

            <Button 
              onClick={addExperience}
              className="w-full mt-2 bg-cvfacile-primary hover:bg-cvfacile-primary/90"
            >
              Ajouter cette expérience
            </Button>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Expériences ajoutées</h3>
            {!resumeData.experiences || !Array.isArray(resumeData.experiences) || resumeData.experiences.length === 0 ? (
              <p className="text-gray-500">Aucune expérience ajoutée</p>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {resumeData.experiences.map((exp) => (
                  <AccordionItem key={exp.id} value={exp.id} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center justify-between w-full text-left">
                        <div>
                          <div className="font-medium">{exp.position}</div>
                          <div className="text-sm text-gray-600">{exp.company}</div>
                        </div>
                        <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1">
                      <div className="mb-2 text-sm">
                        <span className="font-medium">Période: </span> 
                        {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                      </div>
                      <p className="mb-2 text-sm">{exp.description}</p>
                      
                      {exp.achievements && Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                        <div className="mb-3">
                          <div className="mb-1 text-sm font-medium">Réalisations:</div>
                          <ul className="pl-5 text-sm list-disc">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>

        {/* Formation */}
        <TabsContent value="education" className="p-4 space-y-4">
          <div className="mb-6 space-y-4">
            <h3 className="text-lg font-semibold">Nouvelle formation</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-medium">Établissement</label>
                <Input
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                  placeholder="Nom de l'école/université"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Diplôme</label>
                <Input
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  placeholder="ex: Licence, Master, etc."
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Domaine d'études</label>
              <Input
                value={newEducation.field}
                onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                placeholder="ex: Informatique, Commerce, etc."
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block mb-1 text-sm font-medium">Date de début</label>
                <Input
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  placeholder="Sep 2018"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Date de fin</label>
                <Input
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  placeholder="Juin 2022"
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
                <label htmlFor="current-education" className="text-sm">En cours</label>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Description (optionnel)</label>
              <Textarea
                value={newEducation.description || ""}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                placeholder="Informations supplémentaires sur votre formation"
                rows={3}
              />
            </div>

            <Button 
              onClick={addEducation}
              className="w-full mt-2 bg-cvfacile-primary hover:bg-cvfacile-primary/90"
            >
              Ajouter cette formation
            </Button>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Formations ajoutées</h3>
            {!resumeData.education || !Array.isArray(resumeData.education) || resumeData.education.length === 0 ? (
              <p className="text-gray-500">Aucune formation ajoutée</p>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-2">
                {resumeData.education.map((edu) => (
                  <AccordionItem key={edu.id} value={edu.id} className="border rounded-lg">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline">
                      <div className="flex items-center justify-between w-full text-left">
                        <div>
                          <div className="font-medium">{edu.degree}</div>
                          <div className="text-sm text-gray-600">{edu.institution}</div>
                        </div>
                        <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1">
                      <div className="mb-2 text-sm">
                        <span className="font-medium">Période: </span> 
                        {edu.startDate} - {edu.current ? "En cours" : edu.endDate}
                      </div>
                      <div className="mb-2 text-sm">
                        <span className="font-medium">Domaine: </span> 
                        {edu.field}
                      </div>
                      {edu.description && <p className="mb-3 text-sm">{edu.description}</p>}
                      
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </TabsContent>

        {/* Compétences */}
        <TabsContent value="skills" className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">Compétence</label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="ex: JavaScript, Gestion de projet, etc."
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Niveau (1-5)</label>
              <Input
                type="number"
                min={1}
                max={5}
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <Button 
            onClick={addSkill}
            className="w-full bg-cvfacile-primary hover:bg-cvfacile-primary/90"
          >
            Ajouter cette compétence
          </Button>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Compétences ajoutées</h3>
            {!resumeData.skills || !Array.isArray(resumeData.skills) || resumeData.skills.length === 0 ? (
              <p className="text-gray-500">Aucune compétence ajoutée</p>
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
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{skill.level}/5</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Langues */}
        <TabsContent value="languages" className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Langue</label>
              <Input
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
                placeholder="ex: Français, Anglais, etc."
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Niveau</label>
              <select
                value={newLanguage.level}
                onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cvfacile-primary"
              >
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
                <option value="Courant">Courant</option>
                <option value="Bilingue">Bilingue</option>
                <option value="Natif">Natif</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={addLanguage}
            className="w-full bg-cvfacile-primary hover:bg-cvfacile-primary/90"
          >
            Ajouter cette langue
          </Button>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Langues ajoutées</h3>
            {!resumeData.languages || !Array.isArray(resumeData.languages) || resumeData.languages.length === 0 ? (
              <p className="text-gray-500">Aucune langue ajoutée</p>
            ) : (
              <div className="space-y-2">
                {resumeData.languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-sm text-gray-600">{language.level}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLanguage(language.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
              <label className="block mb-1 text-sm font-medium">Nom du certificat</label>
              <Input
                value={newCertification.name}
                onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                placeholder="ex: Azure Administrator"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Émetteur</label>
              <Input
                value={newCertification.issuer}
                onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                placeholder="ex: Microsoft"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Date d'obtention</label>
              <Input
                value={newCertification.date}
                onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                placeholder="Juin 2023"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Date d'expiration (optionnel)</label>
              <Input
                value={newCertification.expiry || ""}
                onChange={(e) => setNewCertification({ ...newCertification, expiry: e.target.value })}
                placeholder="Juin 2025"
              />
            </div>
          </div>

          <Button 
            onClick={addCertification}
            className="w-full mt-2 bg-cvfacile-primary hover:bg-cvfacile-primary/90"
          >
            Ajouter cette certification
          </Button>

          <div className="mt-6">
            <h3 className="mb-3 text-lg font-semibold">Certifications ajoutées</h3>
            {!resumeData.certifications || !Array.isArray(resumeData.certifications) || resumeData.certifications.length === 0 ? (
              <p className="text-gray-500">Aucune certification ajoutée</p>
            )  : (
              <div className="space-y-2">
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">
                        {cert.date}{cert.expiry ? ` - ${cert.expiry}` : ""}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(cert.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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