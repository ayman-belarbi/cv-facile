import React from "react";
import { Phone, Mail, Globe, MapPin, Linkedin, Award, GraduationCap, Briefcase, Star, Heart, Palette, Brush, Sparkles, Calendar } from "lucide-react";
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
  const fonts = fontMappings[settings.font] || fontMappings["inter"];

  return (
    <div 
      className="w-full h-full bg-white"
      style={{ 
        color: settings.colorScheme.text,
        maxWidth: "794px",
        minHeight: "842px"
      }}
    >
      {/* Header with Side Accent */}
      <div className="relative">
        <div 
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: settings.colorScheme.primary }}
        />
        <div className="pl-4 pr-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className={`mt-0.5 ${fonts.body}`}>{personalInfo.title}</p>
            </div>
            <Avatar className="w-28 h-28 border-2" style={{ borderColor: settings.colorScheme.primary }}>
              {personalInfo.profileImage ? (
                <AvatarImage src={personalInfo.profileImage} alt={`${personalInfo.firstName} ${personalInfo.lastName}`} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-gray-50">
                  <UserCircle className="w-10 h-10" style={{ color: settings.colorScheme.primary }} />
                </AvatarFallback>
              )}
            </Avatar>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="px-4 py-2 border-b" style={{ borderColor: settings.colorScheme.primary + '20' }}>
        <div className="flex flex-wrap items-center gap-3">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" style={{ color: settings.colorScheme.primary }} />
              <span className={`text-[11px] ${fonts.body}`}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" style={{ color: settings.colorScheme.primary }} />
              <span className={`text-[11px] ${fonts.body}`}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="w-3 h-3 mr-1" style={{ color: settings.colorScheme.primary }} />
              <span className={`text-[11px] ${fonts.body}`}>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="w-3 h-3 mr-1" style={{ color: settings.colorScheme.primary }} />
              <span className={`text-[11px] ${fonts.body}`}>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Summary */}
            {personalInfo.summary && (
              <div>
                <h2 className={`text-sm font-semibold mb-1.5 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                  {language === 'fr' ? 'Profil' : 'Profile'}
                </h2>
                <p className={`text-[11px] ${fonts.body}`}>{personalInfo.summary}</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className={`text-sm font-semibold mb-1.5 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                  {language === 'fr' ? 'Compétences' : 'Skills'}
                </h2>
                <div className="space-y-1.5">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[11px] ${fonts.body}`}>{skill.name}</span>
                        <span className="text-[10px]" style={{ color: settings.colorScheme.primary }}>
                          {skill.level}/4
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(skill.level / 4) * 100}%`,
                            backgroundColor: settings.colorScheme.primary
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
                <h2 className={`text-sm font-semibold mb-1.5 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                  {language === 'fr' ? 'Langues' : 'Languages'}
                </h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[11px] ${fonts.body}`}>{lang.name}</span>
                        <span className="text-[10px]" style={{ color: settings.colorScheme.primary }}>
                          {lang.level}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(lang.level === 'Native' || lang.level === 'Natif' ? 100 : 
                                     lang.level === 'Fluent' || lang.level === 'Courant' ? 95 :
                                     lang.level === 'C2' ? 90 :
                                     lang.level === 'C1' ? 80 :
                                     lang.level === 'B2' ? 70 :
                                     lang.level === 'B1' ? 60 :
                                     lang.level === 'A2' ? 40 :
                                     lang.level === 'A1' ? 20 : 0)}%`,
                            backgroundColor: settings.colorScheme.primary
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-sm font-semibold mb-2 ${fonts.heading}`} 
                    style={{ color: settings.colorScheme.primary }}>
                  {language === 'fr' ? 'Certifications' : 'Certifications'}
                </h2>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: settings.colorScheme.primary + '40' }}
                    >
                      <div 
                        className="absolute left-[-4px] top-0 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: settings.colorScheme.primary }}
                      />
                      <div className="mb-1">
                        <div className={`text-xs font-semibold ${fonts.heading}`}>
                          {cert.name}
                        </div>
                        <div 
                          className={`text-[11px] font-medium ${fonts.body}`}
                          style={{ color: settings.colorScheme.primary }}
                        >
                          {cert.issuer}
                        </div>
                        <div className="flex items-center mt-0.5 text-[10px] text-gray-500">
                          <Calendar className="w-2.5 h-2.5 mr-1" />
                          {cert.date}
                          {cert.expiry && (
                            <>
                              <span className="mx-1">•</span>
                              {language === 'fr' ? 'Expire' : 'Expires'}: {cert.expiry}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-4">
            {/* Experience */}
            {experiences.length > 0 && (
              <div>
                <h2 className={`text-sm font-semibold mb-2 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                  {language === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: settings.colorScheme.primary + '40' }}>
                      <div className="absolute left-[-4px] top-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                      <div className="mb-1">
                        <h3 className={`text-xs font-semibold ${fonts.heading}`}>{exp.position}</h3>
                        <div className="flex items-center gap-1.5">
                          <div className={`text-[11px] font-medium ${fonts.body}`} style={{ color: settings.colorScheme.primary }}>
                            {exp.company}
                          </div>
                          <span className="text-[10px] text-gray-500">•</span>
                          <span className="text-[10px] text-gray-500">
                            {exp.startDate} - {exp.current ? (language === 'fr' ? "Présent" : "Present") : exp.endDate}
                          </span>
                        </div>
                      </div>
                      <p className={`mb-1.5 text-[11px] ${fonts.body}`}>{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="pl-3 space-y-0.5 list-disc">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className={`text-[11px] ${fonts.body}`}>{achievement}</li>
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
                <h2 className={`text-sm font-semibold mb-2 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                  {language === 'fr' ? 'Formation' : 'Education'}
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-4 border-l-2" style={{ borderColor: settings.colorScheme.primary + '40' }}>
                      <div className="absolute left-[-4px] top-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                      <div className="mb-1">
                        <h3 className={`text-xs font-semibold ${fonts.heading}`}>{edu.institution}</h3>
                        <div className={`text-[11px] font-medium ${fonts.body}`} style={{ color: settings.colorScheme.primary }}>
                          {edu.field}
                        </div>
                        <div className="flex items-center mt-0.5 text-[10px] text-gray-500">
                          <Calendar className="w-2.5 h-2.5 mr-1" />
                          {edu.startDate} - {edu.current ? (language === 'fr' ? "Présent" : "Present") : edu.endDate}
                        </div>
                      </div>
                      {edu.description && <p className={`text-[11px] ${fonts.body}`}>{edu.description}</p>}
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

