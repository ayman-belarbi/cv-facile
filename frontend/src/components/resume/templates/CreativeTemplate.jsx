import React from "react";
import { Phone, Mail, Globe, MapPin, Linkedin, Calendar } from "lucide-react";
import { fontMappings } from "@/lib/resumeData";

const CreativeTemplate = ({ data = {} }) => {
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
      {/* Header with diagonal accent */}
      <div className="relative">
        <div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{ 
            backgroundColor: settings.colorScheme.primary,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
          }}
        ></div>
        
        <div className="relative p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className={`mt-2 text-lg ${fonts.body}`}>{personalInfo.title}</p>
            </div>
            
            {/* Contact info */}
            <div className="text-right space-y-1">
              {personalInfo.phone && (
                <div className="flex items-center justify-end">
                  <Phone className="w-4 h-4 mr-2" style={{ color: settings.colorScheme.primary }} />
                  <span className={`${fonts.body}`}>{personalInfo.phone}</span>
                </div>
              )}
              
              {personalInfo.email && (
                <div className="flex items-center justify-end">
                  <Mail className="w-4 h-4 mr-2" style={{ color: settings.colorScheme.primary }} />
                  <span className={`${fonts.body}`}>{personalInfo.email}</span>
                </div>
              )}
              
              {personalInfo.website && (
                <div className="flex items-center justify-end">
                  <Globe className="w-4 h-4 mr-2" style={{ color: settings.colorScheme.primary }} />
                  <span className={`${fonts.body}`}>{personalInfo.website}</span>
                </div>
              )}
              
              {personalInfo.linkedin && (
                <div className="flex items-center justify-end">
                  <Linkedin className="w-4 h-4 mr-2" style={{ color: settings.colorScheme.primary }} />
                  <span className={`${fonts.body}`}>{personalInfo.linkedin}</span>
                </div>
              )}
              
              {personalInfo.address && (
                <div className="flex items-center justify-end">
                  <MapPin className="w-4 h-4 mr-2" style={{ color: settings.colorScheme.primary }} />
                  <span className={`${fonts.body}`}>{personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mt-6">
              <h2 
                className={`text-lg font-semibold mb-2 ${fonts.heading}`}
                style={{ color: settings.colorScheme.primary }}
              >
                Profil
              </h2>
              <p className={`${fonts.body}`}>{personalInfo.summary}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            {Array.isArray(experiences) && experiences.length > 0 && (
              <div>
                <h2 
                  className={`text-lg font-semibold mb-4 ${fonts.heading}`}
                  style={{ color: settings.colorScheme.primary }}
                >
                  Expérience Professionnelle
                </h2>
                
                <div className="space-y-6">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-base font-semibold ${fonts.heading}`}>{exp.position}</h3>
                        <span className={`text-sm ${fonts.body}`}>
                          {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                        </span>
                      </div>
                      
                      <div 
                        className={`mb-2 text-base font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.secondary }}
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
                  className={`text-lg font-semibold mb-4 ${fonts.heading}`}
                  style={{ color: settings.colorScheme.primary }}
                >
                  Formation
                </h2>
                
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-base font-semibold ${fonts.heading}`}>{edu.degree}</h3>
                        <span className={`text-sm ${fonts.body}`}>
                          {edu.startDate} - {edu.current ? "Présent" : edu.endDate}
                        </span>
                      </div>
                      
                      <div 
                        className={`mb-1 text-base font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.secondary }}
                      >
                        {edu.institution}
                      </div>
                      
                      <div className={`${fonts.body}`}>{edu.field}</div>
                      
                      {edu.description && (
                        <p className={`mt-1 text-sm ${fonts.body}`}>{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 
                  className={`text-lg font-semibold mb-4 ${fonts.heading}`}
                  style={{ color: settings.colorScheme.primary }}
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
                  className={`text-lg font-semibold mb-4 ${fonts.heading}`}
                  style={{ color: settings.colorScheme.primary }}
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
                  className={`text-lg font-semibold mb-4 ${fonts.heading}`}
                  style={{ color: settings.colorScheme.primary }}
                >
                  Certifications
                </h2>
                
                <ul className="space-y-3">
                  {certifications.map((cert) => (
                    <li key={cert.id} className={`${fonts.body}`}>
                      <div
                        className="font-medium"
                        style={{ color: settings.colorScheme.secondary }}
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

export default CreativeTemplate;
