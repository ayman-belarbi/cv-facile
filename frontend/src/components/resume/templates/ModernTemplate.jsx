import React from "react";
import { Phone, Mail, Globe, MapPin, Linkedin, Calendar } from "lucide-react";
import { fontMappings } from "@/lib/resumeData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";

const ModernTemplate = ({ data = {} }) => {
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
        className="px-8 py-10 text-center"
        style={{
          backgroundImage: `linear-gradient(135deg, ${settings.colorScheme.primary}, ${settings.colorScheme.secondary})`,
          color: 'white'
        }}
      >
        <div className="flex flex-col items-center">
          <Avatar className="w-32 h-32 mb-4 border-4 border-white/20">
            {personalInfo.profileImage ? (
              <AvatarImage src={personalInfo.profileImage} alt={`${personalInfo.firstName} ${personalInfo.lastName}`} />
            ) : (
              <AvatarFallback className="bg-white/10">
                <UserCircle className="w-16 h-16 text-white" />
              </AvatarFallback>
            )}
          </Avatar>
          <h1 className={`text-3xl font-bold ${fonts.heading}`}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className={`mt-2 text-xl ${fonts.body}`}>{personalInfo.title}</p>
        </div>
        
        {/* Contact info in header */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
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
              Profil
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
                  Expérience Professionnelle
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
                          {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
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
                  Formation
                </h2>
                
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="grid grid-cols-4 gap-4">
                      <div className="col-span-1">
                        <div className={`font-medium ${fonts.body}`}>
                          {edu.startDate} - {edu.current ? "Présent" : edu.endDate}
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
                  Adresse
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
                  Compétences
                </h2>
                
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`${fonts.body}`}>{skill.name}</span>
                        <span className="text-xs">{skill.level}/5</span>
                      </div>
                      
                      <div className="w-full h-2 overflow-hidden bg-gray-200 rounded-full">
                        <div
                          style={{
                            width: `${(skill.level / 5) * 100}%`,
                            backgroundColor: settings.colorScheme.primary
                          }}
                          className="h-full rounded-full"
                        ></div>
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
                  Langues
                </h2>
                
                <ul className="space-y-2">
                  {languages.map((lang) => (
                    <li key={lang.id} className="flex items-center justify-between">
                      <span className={`${fonts.body}`}>{lang.name}</span>
                      <span
                        className="px-2 py-1 text-xs font-medium text-white rounded"
                        style={{ backgroundColor: settings.colorScheme.accent }}
                      >
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2 
                  className={`pb-2 mb-4 text-xl font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  Certifications
                </h2>
                
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert.id} className={`${fonts.body}`}>
                      <div
                        className="font-medium"
                        style={{ color: settings.colorScheme.primary }}
                      >
                        {cert.name}
                      </div>
                      <div className="text-sm">{cert.issuer}</div>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        {cert.date}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
