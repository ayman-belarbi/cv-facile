import React from "react";
import { Phone, Mail, Globe, MapPin, Linkedin, Calendar } from "lucide-react";
import { fontMappings } from "@/lib/resumeData";

const MedicalTemplate = ({ data = {} }) => {
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
      {/* Header with medical theme */}
      <div
        style={{
          backgroundColor: 'white',
          borderBottom: `4px solid ${settings.colorScheme.primary}`,
          padding: '24px'
        }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
              {personalInfo.firstName} {personalInfo.lastName}
              <span className={`text-xl ml-2 font-normal ${fonts.body}`} style={{ color: settings.colorScheme.secondary }}>
                {personalInfo.title && `• ${personalInfo.title}`}
              </span>
            </h1>
            
            {personalInfo.summary && (
              <p className={`mt-3 text-base ${fonts.body}`} style={{ maxWidth: '600px' }}>
                {personalInfo.summary}
              </p>
            )}
          </div>
        </div>
        
        {/* Contact info */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone 
                className="w-4 h-4 mr-2 flex-shrink-0" 
                style={{ color: settings.colorScheme.primary }} 
              />
              <span className={`text-sm ${fonts.body}`}>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail 
                className="w-4 h-4 mr-2 flex-shrink-0" 
                style={{ color: settings.colorScheme.primary }} 
              />
              <span className={`text-sm ${fonts.body}`}>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe 
                className="w-4 h-4 mr-2 flex-shrink-0" 
                style={{ color: settings.colorScheme.primary }} 
              />
              <span className={`text-sm ${fonts.body}`}>{personalInfo.website}</span>
            </div>
          )}
          
          {personalInfo.address && (
            <div className="flex items-center">
              <MapPin 
                className="w-4 h-4 mr-2 flex-shrink-0" 
                style={{ color: settings.colorScheme.primary }} 
              />
              <span className={`text-sm ${fonts.body}`}>{personalInfo.address}</span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin 
                className="w-4 h-4 mr-2 flex-shrink-0" 
                style={{ color: settings.colorScheme.primary }} 
              />
              <span className={`text-sm ${fonts.body}`}>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content in 2 columns */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left column */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 
                className={`text-lg font-semibold mb-3 pb-2 border-b ${fonts.heading}`}
                style={{ 
                  color: settings.colorScheme.primary,
                  borderColor: settings.colorScheme.primary 
                }}
              >
                Compétences Cliniques
              </h2>
              
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: settings.colorScheme.secondary }}
                    ></div>
                    <span className={`${fonts.body}`}>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 
                className={`text-lg font-semibold mb-3 pb-2 border-b ${fonts.heading}`}
                style={{ 
                  color: settings.colorScheme.primary,
                  borderColor: settings.colorScheme.primary 
                }}
              >
                Langues
              </h2>
              
              <ul className="space-y-2">
                {languages.map((lang) => (
                  <li key={lang.id} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className={`${fonts.body}`}>{lang.name}</span>
                      <span className="text-sm text-gray-600">{lang.level}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 
                className={`text-lg font-semibold mb-3 pb-2 border-b ${fonts.heading}`}
                style={{ 
                  color: settings.colorScheme.primary,
                  borderColor: settings.colorScheme.primary 
                }}
              >
                Certifications & Licences
              </h2>
              
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert.id}>
                    <div className={`font-medium ${fonts.heading}`}>{cert.name}</div>
                    <div className={`text-sm ${fonts.body}`}>{cert.issuer}</div>
                    <div className={`flex items-center mt-1 text-xs text-gray-600 ${fonts.body}`}>
                      <Calendar className="w-3 h-3 mr-1" />
                      {cert.date}
                      {cert.expiry && ` - ${cert.expiry}`}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Right column - Experience and Education */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {Array.isArray(experiences) && experiences.length > 0 && (
            <div>
              <h2 
                className={`text-lg font-semibold mb-3 pb-2 border-b ${fonts.heading}`}
                style={{ 
                  color: settings.colorScheme.primary,
                  borderColor: settings.colorScheme.primary 
                }}
              >
                Expérience Professionnelle
              </h2>
              
              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap items-start justify-between mb-1 gap-2">
                      <h3 className={`text-base font-semibold ${fonts.heading}`}>{exp.position}</h3>
                      <div 
                        className={`text-sm px-2 py-0.5 rounded-full ${fonts.body}`}
                        style={{ 
                          backgroundColor: `${settings.colorScheme.primary}20`,
                          color: settings.colorScheme.primary 
                        }}
                      >
                        {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                      </div>
                    </div>
                    
                    <p 
                      className={`text-sm font-medium mb-1 ${fonts.body}`}
                      style={{ color: settings.colorScheme.secondary }}
                    >
                      {exp.company}
                    </p>
                    
                    <p className={`text-sm ${fonts.body}`}>{exp.description}</p>
                    
                    {exp.achievements.length > 0 && (
                      <ul className="mt-2 ml-4 text-sm space-y-1 list-disc">
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
                className={`text-lg font-semibold mb-3 pb-2 border-b ${fonts.heading}`}
                style={{ 
                  color: settings.colorScheme.primary,
                  borderColor: settings.colorScheme.primary 
                }}
              >
                Formation
              </h2>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-wrap items-start justify-between mb-1 gap-2">
                      <h3 className={`text-base font-semibold ${fonts.heading}`}>{edu.degree}</h3>
                      <div 
                        className={`text-sm px-2 py-0.5 rounded-full ${fonts.body}`}
                        style={{ 
                          backgroundColor: `${settings.colorScheme.primary}20`,
                          color: settings.colorScheme.primary 
                        }}
                      >
                        {edu.startDate} - {edu.current ? "Présent" : edu.endDate}
                      </div>
                    </div>
                    
                    <p 
                      className={`text-sm font-medium mb-1 ${fonts.body}`}
                      style={{ color: settings.colorScheme.secondary }}
                    >
                      {edu.institution}
                    </p>
                    
                    <p className={`text-sm ${fonts.body}`}>{edu.field}</p>
                    
                    {edu.description && (
                      <p className={`mt-1 text-sm ${fonts.body}`}>{edu.description}</p>
                    )}
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

export default MedicalTemplate;
