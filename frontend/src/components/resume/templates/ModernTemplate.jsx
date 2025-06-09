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
      className="w-full bg-white"
      style={{ 
        color: settings.colorScheme.text,
        maxWidth: "794px",
        minHeight: "842px"
      }}
    >
      <div className="flex min-h-full">
        {/* Left Sidebar */}
        <div
          className="w-1.5/4 min-h-full"
          style={{ backgroundColor: settings.colorScheme.primary }}
        >
          <div className="p-4 text-white">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-4">
              <Avatar className="w-28 h-28 mb-2 border-2 border-white/20">
                {personalInfo.profileImage ? (
                  <AvatarImage src={personalInfo.profileImage} alt={`${personalInfo.firstName} ${personalInfo.lastName}`} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-white/10">
                    <UserCircle className="w-12 h-12 text-white" />
                  </AvatarFallback>
                )}
              </Avatar>
              <h1 className={`text-2xl font-bold text-center ${fonts.heading}`}>
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
              <p className={`mt-0.5 text-xs text-white/90 text-center ${fonts.body}`}>{personalInfo.title}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-1.5 mb-4">
              {personalInfo.phone && (
                <div className="flex gap-1.5">
                  <Phone className="w-3 h-3 text-white/70 flex-shrink-0" />
                  <span className={`text-[11px] break-words ${fonts.body}`}>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex gap-1.5">
                  <Mail className="w-3 h-3 text-white/70 flex-shrink-0" />
                  <span className={`text-[11px] break-words ${fonts.body}`}>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex gap-1.5">
                  <Globe className="w-3 h-3 text-white/70 flex-shrink-0" />
                  <span className={`text-[11px] break-words ${fonts.body}`}>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.address && (
                <div className="flex gap-1.5">
                  <MapPin className="w-3 h-3 text-white/70 flex-shrink-0" />
                  <span className={`text-[11px] break-words ${fonts.body}`}>{personalInfo.address}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex gap-1.5">
                  <Linkedin className="w-3 h-3 text-white/70 flex-shrink-0" />
                  <span className={`text-[11px] break-words ${fonts.body}`}>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-sm font-bold mb-2 ${fonts.heading}`}>
                  {language === 'fr' ? 'Compétences' : 'Skills'}
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="border-l-2 border-white/30 pl-2">
                      <div className={`text-[11px] font-semibold break-words ${fonts.heading}`}>
                        {skill.name}
                      </div>
                      <div className="h-1 bg-white/20 rounded-full overflow-hidden mt-0.5">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300"
                          style={{ width: `${(skill.level / 4) * 100}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-white/80 mt-0.5">{skill.level}/4</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-4">
                <h2 className={`text-sm font-bold mb-2 ${fonts.heading}`}>
                  {language === 'fr' ? 'Langues' : 'Languages'}
                </h2>
                <div className="space-y-1.5">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex items-center justify-between">
                      <span className={`text-[11px] break-words pr-2 flex-1 ${fonts.body}`}>{lang.name}</span>
                      <span className="text-[10px] text-white/70 whitespace-nowrap">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Main Content */}
        <div className="w-2/3 p-4">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-1.5 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                {language === 'fr' ? 'Profil' : 'Profile'}
              </h2>
              <p className={`text-[11px] text-gray-600 whitespace-pre-wrap ${fonts.body}`}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                {language === 'fr' ? 'Expérience Professionnelle' : 'Professional Experience'}
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2" style={{ borderColor: settings.colorScheme.primary }}>
                    <div className="absolute left-[-4px] top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                    <div className="mb-1">
                      <h3 className={`text-xs font-semibold ${fonts.heading}`}>{exp.position}</h3>
                      <div className={`text-[11px] font-medium ${fonts.body}`} style={{ color: settings.colorScheme.primary }}>
                        {exp.company}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {exp.startDate} - {exp.current ? (language === 'fr' ? "Présent" : "Present") : exp.endDate}
                      </div>
                    </div>
                    <p className={`text-[11px] text-gray-600 mb-1.5 ${fonts.body}`}>{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="pl-3 space-y-0.5 list-disc">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className={`text-[11px] text-gray-600 ${fonts.body}`}>
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
            <div className="mb-4">
              <h2 className={`text-sm font-bold mb-2 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                {language === 'fr' ? 'Formation' : 'Education'}
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-3 border-l-2" style={{ borderColor: settings.colorScheme.primary }}>
                    <div className="absolute left-[-4px] top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                    <div className="mb-1">
                      <h3 className={`text-xs font-semibold ${fonts.heading}`}>{edu.institution}</h3>
                      <div className={`text-[11px] font-medium ${fonts.body}`} style={{ color: settings.colorScheme.primary }}>
                        {edu.field}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {edu.startDate} - {edu.current ? (language === 'fr' ? "En cours" : "Present") : edu.endDate}
                      </div>
                    </div>
                    {edu.description && <p className={`text-[11px] text-gray-600 ${fonts.body}`}>{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className={`text-sm font-bold mb-2 ${fonts.heading}`} style={{ color: settings.colorScheme.primary }}>
                {language === 'fr' ? 'Certifications' : 'Certifications'}
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="relative pl-3 border-l-2" style={{ borderColor: settings.colorScheme.primary }}>
                    <div className="absolute left-[-4px] top-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: settings.colorScheme.primary }} />
                    <div className="mb-1">
                      <h3 className={`text-xs font-semibold ${fonts.heading}`}>{cert.name}</h3>
                      <div className={`text-[11px] font-medium ${fonts.body}`} style={{ color: settings.colorScheme.primary }}>
                        {cert.issuer}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {cert.date}
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
  );
};

export default ModernTemplate;

