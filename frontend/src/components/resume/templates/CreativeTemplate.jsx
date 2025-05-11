import React from "react";
import { Phone, Mail, Globe, MapPin, Linkedin } from "lucide-react";
import { fontMappings } from "@/lib/resumeData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CreativeTemplate = ({ data = {} }) => {
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
  const fonts = fontMappings[settings.font] || {};

  return (
    <div
      className="w-full h-full shadow-lg bg-white resume-shadow"
      style={{
        color: settings.colorScheme.text,
        maxWidth: '794px', // A4 width in px (roughly)
        minHeight: '1123px', // A4 height in px
      }}
    >
      {/* Header */}
      <div
        className="px-8 py-6"
        style={{
          backgroundColor: settings.colorScheme.primary,
          color: 'white'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold ${fonts.heading}`}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className={`mt-1 text-lg ${fonts.body}`}>{personalInfo.title}</p>
          </div>
          <Avatar className="w-24 h-24 border-2 border-white">
            {personalInfo.profileImage ? (
              <AvatarImage src={personalInfo.profileImage} alt={`${personalInfo.firstName} ${personalInfo.lastName}`} />
            ) : (
              <AvatarFallback className="bg-white/10">
                <UserCircle className="w-12 h-12 text-white" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        
        {/* Contact info in header */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              <span className="text-sm">{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              <span className="text-sm">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              <span className="text-sm">{personalInfo.website}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-1" />
              <span className="text-sm">{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 
              className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
              style={{ borderColor: settings.colorScheme.primary }}
            >
              {language === 'fr' ? 'Profil' : 'Profile'}
            </h2>
            <p className={`${fonts.body}`}>{personalInfo.summary}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {Array.isArray(experiences) && experiences.length > 0 && (
              <div>
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                </h2>
                
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${fonts.heading}`}>{exp.position}</h3>
                        <span
                          className="px-3 py-1 text-xs font-medium text-white rounded-full"
                          style={{ backgroundColor: settings.colorScheme.accent }}
                        >
                          {exp.startDate} - {exp.current ? (language === 'fr' ? "Présent" : "Present") : exp.endDate}
                        </span>
                      </div>
                      
                      <div 
                        className={`mb-2 text-base font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.primary }}
                      >
                        {exp.company}
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
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Formation' : 'Education'}
                </h2>
                
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <div className={`font-medium ${fonts.body}`}>
                          {edu.startDate} - {edu.current ? (language === 'fr' ? "Présent" : "Present") : edu.endDate}
                        </div>
                      </div>
                      
                      <div className="col-span-3">
                        <h3 className={`font-semibold ${fonts.heading}`}>{edu.degree}</h3>
                        <div className={`${fonts.body}`}>
                          <div 
                            className="font-medium"
                            style={{ color: settings.colorScheme.primary }}
                          >
                            {edu.institution}
                          </div>
                          <div className="mb-1">{edu.field}</div>
                          {edu.description && <p className="text-sm">{edu.description}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Address */}
            {personalInfo.address && (
              <div>
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Adresse' : 'Address'}
                </h2>
                <div className="flex items-start">
                  <MapPin className="flex-shrink-0 w-5 h-5 mr-2 mt-0.5" style={{ color: settings.colorScheme.primary }} />
                  <span className={`${fonts.body}`}>{personalInfo.address}</span>
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Compétences' : 'Skills'}
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between">
                        <span className={`${fonts.body}`}>{skill.name}</span>
                        <div className="flex items-center">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full mx-0.5 ${
                                level <= skill.level ? 'bg-cvfacile-primary' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Langues' : 'Languages'}
                </h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className={`${fonts.body}`}>{lang.name}</span>
                      <span className="text-sm text-gray-600">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Certifications' : 'Certifications'}
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div key={cert.id}>
                      <div className={`font-medium ${fonts.body}`}>{cert.name}</div>
                      <div className="text-sm text-gray-600">{cert.issuer}</div>
                      <div className="text-xs text-gray-500">
                        {cert.date} {cert.expiry ? ` - ${cert.expiry}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
