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
          className="h-48"
        style={{
            backgroundColor: settings.colorScheme.primary,
          }}
        />
        <div className="absolute inset-0 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-white/10" />
                <Avatar className="relative w-24 h-24 border-4 border-white/20 shadow-lg">
                  {personalInfo.profileImage ? (
                    <AvatarImage
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                      className="object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-white/10">
                      <UserCircle className="w-12 h-12 text-white" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div>
                <h1
                  className={`text-3xl font-bold text-white ${fonts.heading}`}
                >
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
                <p className={`mt-1 text-xl text-white/90 ${fonts.body}`}>
                  {personalInfo.title}
              </p>
              </div>
            </div>
          </div>
          </div>
        </div>
        
      {/* Contact Information with Medical Theme */}
      <div className="relative px-8 -mt-6 mb-8">
        <div className="bg-white rounded-lg p-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone 
                  className="w-4 h-4"
                  style={{ Color: settings.colorScheme.primary }}
              />
                <span className={`text-sm ml-2 ${fonts.body}`}>
                  {personalInfo.phone}
                </span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail 
                  className="w-4 h-4"
                  style={{ Color: settings.colorScheme.primary }}
              />

                <span className={`text-sm ml-2 ${fonts.body}`}>
                  {personalInfo.email}
                </span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe 
                  className="w-4 h-4"
                  style={{ Color: settings.colorScheme.primary }}
              />

                <span className={`text-sm ml-2 ${fonts.body}`}>
                  {personalInfo.website}
                </span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin 
                  className="w-4 h-4"
                  style={{ Color: settings.colorScheme.primary }}
              />

                <span className={`text-sm ml-2 ${fonts.body}`}>
                  {personalInfo.linkedin}
                </span>
            </div>
          )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Summary */}
            {personalInfo.summary && (
              <div className="rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Brain
                    className="w-4 h-4"
                    style={{ Color: settings.colorScheme.primary }}
                  />

                  <h2
                    className={`text-lg font-semibold ml-2 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
                  >
                    {language === "fr" ? "Profil" : "Profile"}
                  </h2>
                </div>
                <p className={`${fonts.body}`}>{personalInfo.summary}</p>
              </div>
            )}

          {/* Skills */}
          {skills.length > 0 && (
              <div className="rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Syringe
                    className="w-4 h-4"
                    style={{ Color: settings.colorScheme.primary }}
                  />

                  <h2
                    className={`text-lg font-semibold ml-2 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
              >
                    {language === "fr" ? "Compétences" : "Skills"}
              </h2>
                </div>
                <div className="space-y-3">
                {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`${fonts.body}`}>{skill.name}</span>
                        <span
                          className="text-sm"
                          style={{ color: settings.colorScheme.primary }}
                        >
                          {skill.level}/5
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${(skill.level / 5) * 100}%`,
                            backgroundColor: settings.colorScheme.primary,
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
              <div className="rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe
                    className="w-4 h-4"
                    style={{ Color: settings.colorScheme.primary }}
                  />

              <h2 
                    className={`text-lg font-semibold ml-2 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
              >
                    {language === "fr" ? "Langues" : "Languages"}
              </h2>
                </div>
                <div className="space-y-3">
                {languages.map((lang) => (
                    <div key={lang.id}>
                      <div className="flex items-center justify-between mb-1">
                      <span className={`${fonts.body}`}>{lang.name}</span>
                        <span
                          className="text-sm"
                          style={{ color: settings.colorScheme.primary }}
                        >
                          {lang.level}
                        </span>
                    </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
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
          <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
            {experiences.length > 0 && (
            <div>
                <div className="flex items-center mb-4">
                  <Stethoscope
                    className="w-4 h-4"
                    style={{ Color: settings.colorScheme.primary }}
                  />

                  <h2
                    className={`text-lg font-semibold ml-2 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
              >
                    {language === "fr"
                      ? "Expérience Professionnelle"
                      : "Professional Experience"}
              </h2>
                </div>
                <div className="space-y-6">
                {experiences.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-6 border-l-2"
                      style={{ borderColor: settings.colorScheme.primary }}
                    >
                      <div 
                        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
                        style={{ 
                          backgroundColor: settings.colorScheme.primary,
                        }}
                      />
                      <div className="mb-2">
                        <h3
                          className={`text-lg font-semibold ${fonts.heading}`}
                        >
                          {exp.position}
                        </h3>
                        <div
                          className={`text-base font-medium ${fonts.body}`}
                          style={{ color: settings.colorScheme.primary }}
                      >
                          {exp.company}
                        </div>
                        <div className="text-sm text-gray-600">
                          {exp.startDate} -{" "}
                          {exp.current
                            ? language === "fr"
                              ? "Présent"
                              : "Present"
                            : exp.endDate}
                        </div>
                      </div>
                      <p className={`mb-3 ${fonts.body}`}>{exp.description}</p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="pl-5 space-y-1 list-disc">
                        {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className={`${fonts.body}`}>
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
                <div className="flex items-center mb-4">
                  <GraduationCap
                    className="w-4 h-4"
                    style={{ Color: settings.colorScheme.primary }}
                  />

              <h2 
                    className={`text-lg font-semibold ml-2 ${fonts.heading}`}
                    style={{ color: settings.colorScheme.primary }}
              >
                    {language === "fr" ? "Formation" : "Education"}
              </h2>
                </div>
              <div className="space-y-4">
                {education.map((edu) => (
                    <div
                      key={edu.id}
                      className="relative pl-6 border-l-2"
                      style={{ borderColor: settings.colorScheme.primary }}
                    >
                      <div 
                        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full"
                        style={{ 
                          backgroundColor: settings.colorScheme.primary,
                        }}
                      />
                      <div className="mb-2">
                        <h3 className={`font-semibold ${fonts.heading}`}>
                          {edu.degree}
                        </h3>
                        <div
                          className="font-medium"
                          style={{ color: settings.colorScheme.primary }}
                      >
                          {edu.institution}
                        </div>
                        <div className="text-sm text-gray-600">
                          {edu.startDate} -{" "}
                          {edu.current
                            ? language === "fr"
                              ? "Présent"
                              : "Present"
                            : edu.endDate}
                        </div>
                      </div>
                      <div className={`${fonts.body}`}>
                        <div className="mb-1">{edu.field}</div>
                        {edu.description && (
                          <p className="text-sm">{edu.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div className="rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Award className="w-4 h-4" style={{ Color: settings.colorScheme.primary }} />
                  <h2 className={`text-lg font-semibold ml-2 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                    {language === "fr" ? "Certifications" : "Certifications"}
                  </h2>
                </div>
                <div className="space-y-3">
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
    </div>
  );
};

export default MedicalTemplate;
