import React from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Linkedin,
  Award,
  GraduationCap,
  Briefcase,
  Star,
  Heart,
  Stethoscope,
  Pill,
  Activity,
  Microscope,
  Brain,
  Syringe,
  Calendar,
} from "lucide-react";
import { fontMappings } from "@/lib/resumeData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MedicalTemplate = ({ data = {} }) => {
  const { language } = useLanguage();
  const {
    personalInfo = {},
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    certifications = [],
    settings = { colorScheme: {}, font: "" },
  } = data;
  const fonts = fontMappings[settings.font] || fontMappings["inter"];

  return (
    <div
      className="w-full h-full shadow-lg bg-white resume-shadow"
      style={{
        color: settings.colorScheme.text,
        maxWidth: "794px",
        minHeight: "1123px",
      }}
    >
      {/* Medical Header with Professional Design */}
      <div className="relative">
        <div 
          className="h-28"
          style={{
            backgroundColor: settings.colorScheme.primary,
          }}
        />
        <div className="absolute inset-0 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-white/10" />
                <Avatar className="relative w-16 h-16 border-2 border-white/20 shadow-lg">
                  {personalInfo.profileImage ? (
                    <AvatarImage
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-white/10">
                      <UserCircle className="w-10 h-10 text-white" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div>
                <h1 className={`text-base font-bold text-white ${fonts.heading}`}>
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className={`mt-0.5 text-sm text-white/90 ${fonts.body}`}>
                  {personalInfo.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      {/* Contact Information with Medical Theme */}
      <div className="relative px-4 -mt-4 mb-4">
        <div className="bg-white rounded-lg p-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 flex-shrink-0" style={{ color: settings.colorScheme.primary }} />
                <span className={`text-[11px] ml-1.5 ${fonts.body}`}>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-3 h-3 flex-shrink-0" style={{ color: settings.colorScheme.primary }} />
                <span className={`text-[11px] ml-1.5 ${fonts.body}`}>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center">
                <Globe className="w-3 h-3 flex-shrink-0" style={{ color: settings.colorScheme.primary }} />
                <span className={`text-[11px] ml-1.5 ${fonts.body}`}>{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-3 h-3 flex-shrink-0" style={{ color: settings.colorScheme.primary }} />
                <span className={`text-[11px] ml-1.5 ${fonts.body}`}>{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Brain className="w-3 h-3 flex-shrink-0" style={{ color: settings.colorScheme.primary }} />
                  <h2 className={`text-sm font-semibold ml-1.5 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                    {language === "fr" ? "Profil" : "Profile"}
                  </h2>
                </div>
                <p className={`text-[11px] ${fonts.body}`}>{personalInfo.summary}</p>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Syringe className="w-3 h-3 flex-shrink-0" style={{ color: settings.colorScheme.primary }} />
                  <h2 className={`text-sm font-semibold ml-1.5 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                    {language === "fr" ? "Compétences" : "Skills"}
                  </h2>
                </div>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[11px] break-words pr-2 flex-1 ${fonts.body}`}>{skill.name}</span>
                        <span className="text-[10px] text-gray-600 whitespace-nowrap">{skill.level}/4</span>
                      </div>
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
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
              <div className="rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Globe
                    className="w-3 h-3"
                    style={{ color: settings.colorScheme.primary }}
                  />
                  <h2 
                    className={`text-sm font-semibold ml-1.5 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
                  >
                    {language === "fr" ? "Langues" : "Languages"}
                  </h2>
                </div>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.id}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`text-[11px] ${fonts.body}`}>{lang.name}</span>
                        <span className="text-[10px]" style={{ color: settings.colorScheme.primary }}>
                          {lang.level}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${
                              lang.level === "Native" || lang.level === "Natif"
                                ? 100
                                : lang.level === "Fluent" ||
                                  lang.level === "Courant"
                                ? 90
                                : lang.level === "Advanced" ||
                                  lang.level === "Avancé"
                                ? 80
                                : lang.level === "Intermediate" ||
                                  lang.level === "Intermédiaire"
                                ? 60
                                : lang.level === "Basic" ||
                                  lang.level === "Débutant"
                                ? 40
                                : 20
                            }%`,
                            backgroundColor: settings.colorScheme.primary,
                          }}
                        />
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
                <div className="flex items-center mb-2">
                  <Stethoscope
                    className="w-3 h-3"
                    style={{ color: settings.colorScheme.primary }}
                  />
                  <h2
                    className={`text-sm font-semibold ml-1.5 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
                  >
                    {language === "fr"
                      ? "Expérience Professionnelle"
                      : "Professional Experience"}
                  </h2>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: settings.colorScheme.primary }}
                    >
                      <div 
                        className="absolute -left-[5px] top-0 w-1.5 h-1.5 rounded-full"
                        style={{ 
                          backgroundColor: settings.colorScheme.primary,
                        }}
                      />
                      <div className="mb-1">
                        <h3 className={`text-xs font-semibold ${fonts.heading}`}>
                          {exp.position}
                        </h3>
                        <div
                          className={`text-[11px] font-medium ${fonts.body}`}
                          style={{ color: settings.colorScheme.primary }}
                        >
                          {exp.company}
                        </div>
                        <div className="text-[10px] text-gray-600">
                          {exp.startDate} -{" "}
                          {exp.current
                            ? language === "fr"
                              ? "Présent"
                              : "Present"
                            : exp.endDate}
                        </div>
                      </div>
                      <p className={`mb-1.5 text-[11px] ${fonts.body}`}>{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="pl-3 space-y-0.5 list-disc">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className={`text-[11px] ${fonts.body}`}>
                              {achievement}
                            </li>
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
                <div className="flex items-center mb-2">
                  <GraduationCap
                    className="w-3 h-3"
                    style={{ color: settings.colorScheme.primary }}
                  />
                  <h2 
                    className={`text-sm font-semibold ml-1.5 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
                  >
                    {language === "fr" ? "Formation" : "Education"}
                  </h2>
                </div>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: settings.colorScheme.primary }}
                    >
                      <div 
                        className="absolute -left-[5px] top-0 w-1.5 h-1.5 rounded-full"
                        style={{ 
                          backgroundColor: settings.colorScheme.primary,
                        }}
                      />
                      <div className="mb-1">
                        <h3 className={`text-xs font-semibold ${fonts.heading}`}>
                          {edu.degree}
                        </h3>
                        <div
                          className={`text-[11px] font-medium ${fonts.body}`}
                          style={{ color: settings.colorScheme.primary }}
                        >
                          {edu.institution}
                        </div>
                        <div className="text-[10px] text-gray-600">
                          {edu.startDate} -{" "}
                          {edu.current
                            ? language === "fr"
                              ? "Présent"
                              : "Present"
                            : edu.endDate}
                        </div>
                      </div>
                      <div className={`${fonts.body}`}>
                        <div className="text-[11px] font-medium">{edu.field}</div>
                        {edu.description && (
                          <p className="text-[11px] text-gray-600">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <div className="flex items-center mb-2">
                  <Award
                    className="w-3 h-3"
                    style={{ color: settings.colorScheme.primary }}
                  />
                  <h2
                    className={`text-sm font-semibold ml-1.5 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
                  >
                    {language === 'fr' ? 'Certifications' : 'Certifications'}
                  </h2>
                </div>
                <div className="space-y-3">
                  {certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: settings.colorScheme.primary }}
                    >
                      <div 
                        className="absolute -left-[5px] top-0 w-1.5 h-1.5 rounded-full"
                        style={{ 
                          backgroundColor: settings.colorScheme.primary,
                        }}
                      />
                      <div className="mb-1">
                        <h3 className={`text-xs font-semibold ${fonts.heading}`}>
                          {cert.name}
                        </h3>
                        <div
                          className={`text-[11px] font-medium ${fonts.body}`}
                          style={{ color: settings.colorScheme.primary }}
                        >
                          {cert.issuer}
                        </div>
                        <div className="text-[10px] text-gray-600">
                          {cert.date}
                          {cert.expiry && (
                            <>
                              {" - "}
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
        </div>
      </div>
    </div>
  );
};

export default MedicalTemplate;
