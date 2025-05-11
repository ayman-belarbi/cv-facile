import React from "react";
import { Phone, Mail, Globe, MapPin, Linkedin, Calendar, Award, GraduationCap, Briefcase } from "lucide-react";
import { fontMappings } from "@/lib/resumeData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ModernTemplate = ({ data = {} }) => {
  const { language } = useLanguage();
  const {
    personalInfo = {},
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    certifications = [],
    settings = { colorScheme: {}, font: '' }
  } = data;
  const fonts = fontMappings[settings.font] || fontMappings["inter"];

  return (
    <div
      className="w-full h-full shadow-lg bg-white resume-shadow"
      style={{
        color: settings.colorScheme.text,
        maxWidth: '794px',
        minHeight: '1123px',
      }}
    >
      <div className="flex h-full">
        {/* Side Panel */}
      <div
          className="w-1.1/3 h-[1123px] p-6 text-white flex flex-col"
          style={{ backgroundColor: settings.colorScheme.primary }}
        >
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-32 h-32 mb-4 border-4 border-white/20">
              {personalInfo.profileImage ? (
                <AvatarImage src={personalInfo.profileImage} alt={`${personalInfo.firstName} ${personalInfo.lastName}`} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-white/10">
                  <UserCircle className="w-16 h-16 text-white" />
                </AvatarFallback>
              )}
            </Avatar>
            <h1 className={`text-2xl font-bold text-center ${fonts.heading}`}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
            <p className={`text-center mt-2 text-white/90 ${fonts.body}`}>{personalInfo.title}</p>
          </div>
        
          {/* Contact Info */}
          <div className="space-y-4 mb-8">
          {personalInfo.phone && (
            <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className={`text-sm ${fonts.body}`}>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.email && (
            <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span className={`text-sm ${fonts.body}`}>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <span className={`text-sm ${fonts.body}`}>{personalInfo.website}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                <span className={`text-sm ${fonts.body}`}>{personalInfo.linkedin}</span>
              </div>
            )}

            {personalInfo.address && (
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span className={`text-sm ${fonts.body}`}>{personalInfo.address}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-lg font-bold mb-4 ${fonts.heading}`}>
                {language === 'fr' ? 'Compétences' : 'Skills'}
              </h2>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${fonts.body}`}>{skill.name}</span>
                      <span className="text-xs text-white/80">{skill.level}/5</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(skill.level / 5) * 100}%`,
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold mb-4 ${fonts.heading}`}>
                {language === 'fr' ? 'Langues' : 'Languages'}
              </h2>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm ${fonts.body}`}>{lang.name}</span>
                      <span className="text-xs text-white/80">{lang.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(lang.level === 'Native' || lang.level === 'Natif' ? 100 : 
                                   lang.level === 'Fluent' || lang.level === 'Courant' ? 90 :
                                   lang.level === 'Advanced' || lang.level === 'Avancé' ? 80 :
                                   lang.level === 'Intermediate' || lang.level === 'Intermédiaire' ? 60 :
                                   lang.level === 'Basic' || lang.level === 'Débutant' ? 40 : 20)}%`,
                          backgroundColor: 'white'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
        </div>
          )}
      </div>
      
        {/* Main Content */}
        <div className="w-2/3 p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
              <h2 className={`text-xl font-bold mb-3 ${fonts.heading}`}>
                {language === 'fr' ? 'Profil' : 'Profile'}
            </h2>
            <p className={`${fonts.body}`}>{personalInfo.summary}</p>
          </div>
        )}
        
            {/* Experience */}
            {Array.isArray(experiences) && experiences.length > 0 && (
            <div className="mb-8">
              <h2 className={`text-xl font-bold mb-4 ${fonts.heading}`}>
                {language === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                </h2>
                <div className="space-y-6">
                  {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2" style={{ borderColor: settings.colorScheme.primary }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                    <div className="mb-2">
                        <h3 className={`text-lg font-semibold ${fonts.heading}`}>{exp.position}</h3>
                      <div 
                        className={`text-base font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.primary }}
                      >
                        {exp.company}
                      </div>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? (language === 'fr' ? "Présent" : "Present") : exp.endDate}
                      </div>
                    </div>
                      <p className={`mb-3 ${fonts.body}`}>{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="pl-5 space-y-1 list-disc">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className={`${fonts.body}`}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education */}
            {education.length > 0 && (
              <div>
              <h2 className={`text-xl font-bold mb-4 ${fonts.heading}`}>
                {language === 'fr' ? 'Formation' : 'Education'}
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6 border-l-2" style={{ borderColor: settings.colorScheme.primary }}>
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                    <div className="mb-2">
                        <h3 className={`font-semibold ${fonts.heading}`}>{edu.degree}</h3>
                          <div 
                            className="font-medium"
                            style={{ color: settings.colorScheme.primary }}
                          >
                            {edu.institution}
                          </div>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.current ? (language === 'fr' ? "Présent" : "Present") : edu.endDate}
                      </div>
                    </div>
                    <div className={`${fonts.body}`}>
                      <div className="mb-1">{edu.field}</div>
                      {edu.description && <p className="text-sm">{edu.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="mb-8">
                <h2 className={`text-xl font-bold mb-4 ${fonts.heading}`}>{language === 'fr' ? 'Certifications' : 'Certifications'}</h2>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="border rounded-md p-3">
                      <div className={`font-medium ${fonts.body}`} style={{ color: settings.colorScheme.primary }}>{cert.name}</div>
                      <div className="text-sm text-gray-600 mt-1 mb-2">{cert.issuer}</div>
                      <span className="px-3 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: settings.colorScheme.accent }}>
                        {cert.date} {cert.expiry ? ` - ${cert.expiry}` : ""}
                      </span>
                      </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
