import React from "react";
import PropTypes from "prop-types";
import { ResumeData } from "@/lib/resumeData";
import { Phone, Mail, MapPin, Globe, Linkedin, Calendar } from "lucide-react";
import { fontMappings } from "@/lib/resumeData";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ClassicTemplate = ({ data = {} }) => {
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
      className="w-full h-full bg-white"
      style={{ 
        color: settings.colorScheme.text,
        maxWidth: "794px",
        minHeight: "842px"
      }}
    >
      {/* Header */}
      <div 
        className="px-6 py-4"
        style={{
          backgroundColor: settings.colorScheme.primary,
          color: "white",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${fonts.heading}`}>
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className={`mt-1 text-base ${fonts.body}`}>{personalInfo.title}</p>
          </div>
          <Avatar className="w-20 h-20 border-2 border-white">
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

        {/* Contact info in header */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1" />
              <span className="text-xs">{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              <span className="text-xs">{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="w-3 h-3 mr-1" />
              <span className="text-xs">{personalInfo.website}</span>
            </div>
          )}

          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="w-3 h-3 mr-1" />
              <span className="text-xs">{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2
              className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
              style={{ borderColor: settings.colorScheme.primary }}
            >
              {language === "fr" ? "Profil" : "Profile"}
            </h2>
            <p className={`text-xs ${fonts.body}`}>{personalInfo.summary}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Experience */}
            {Array.isArray(experiences) && experiences.length > 0 && (
              <div>
                <h2
                  className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === "fr"
                    ? "Expérience Professionnelle"
                    : "Professional Experience"}
                </h2>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-semibold ${fonts.heading}`}>
                          {exp.position}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-[10px] font-medium text-white rounded-full"
                          style={{
                            backgroundColor: settings.colorScheme.accent,
                          }}
                        >
                          {exp.startDate} -{" "}
                          {exp.current
                            ? language === "fr"
                              ? "Présent"
                              : "Present"
                            : exp.endDate}
                        </span>
                      </div>

                      <div
                        className={`mb-1 text-xs font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.primary }}
                      >
                        {exp.company}
                      </div>

                      <p className={`mb-2 text-[11px] ${fonts.body}`}>{exp.description}</p>

                      {exp.achievements.length > 0 && (
                        <ul className="pl-4 space-y-0.5 list-disc">
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
                <h2
                  className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === 'fr' ? 'Formation' : 'Education'}
                </h2>
                <div className="space-y-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-semibold ${fonts.heading}`}>
                          {edu.institution}
                        </h3>
                        <span
                          className="px-2 py-0.5 text-[10px] font-medium text-white rounded-full"
                          style={{
                            backgroundColor: settings.colorScheme.accent,
                          }}
                        >
                          {edu.startDate} - {edu.current ? (language === 'fr' ? 'En cours' : 'Present') : edu.endDate}
                        </span>
                      </div>

                      <div
                        className={`mb-1 text-xs font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.primary }}
                      >
                        {edu.field}
                      </div>

                      {edu.description && <p className={`text-[11px] ${fonts.body}`}>{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address */}
            {personalInfo.address && (
              <div>
                <h2
                  className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === "fr" ? "Adresse" : "Address"}
                </h2>
                <div className="flex items-start">
                  <MapPin
                    className="flex-shrink-0 w-3.5 h-3.5 mr-1.5 mt-0.5"
                    style={{ color: settings.colorScheme.primary }}
                  />
                  <span className={`text-xs ${fonts.body}`}>
                    {personalInfo.address}
                  </span>
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2
                  className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === "fr" ? "Compétences" : "Skills"}
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs break-words pr-2 flex-1 ${fonts.body}`}>{skill.name}</span>
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
              <div>
                <h2
                  className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === "fr" ? "Langues" : "Languages"}
                </h2>
                <div className="space-y-1.5">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="flex items-center justify-between"
                    >
                      <span className={`text-xs ${fonts.body}`}>{lang.name}</span>
                      <span className="text-[11px] text-gray-600">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div>
                <h2
                  className={`pb-1.5 mb-2 text-base font-bold border-b-2 ${fonts.heading}`}
                  style={{ borderColor: settings.colorScheme.primary }}
                >
                  {language === "fr" ? "Certifications" : "Certifications"}
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="rounded-md p-2">
                      <div
                        className={`text-xs font-medium ${fonts.body}`}
                        style={{ color: settings.colorScheme.primary }}
                      >
                        {cert.name}
                      </div>
                      <div className="text-[11px] text-gray-600 mt-0.5 mb-1">
                        {cert.issuer}
                      </div>
                      <span
                        className="px-2 py-0.5 text-[10px] font-medium text-white rounded-full"
                        style={{ backgroundColor: settings.colorScheme.accent }}
                      >
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

ClassicTemplate.propTypes = {
  data: PropTypes.shape({
    personalInfo: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      title: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      website: PropTypes.string,
      linkedin: PropTypes.string,
      summary: PropTypes.string,
    }),
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        position: PropTypes.string,
        company: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        current: PropTypes.bool,
        description: PropTypes.string,
        achievements: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        degree: PropTypes.string,
        institution: PropTypes.string,
        field: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        current: PropTypes.bool,
        description: PropTypes.string,
      })
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        level: PropTypes.number,
      })
    ),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        level: PropTypes.string,
      })
    ),
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        issuer: PropTypes.string,
        date: PropTypes.string,
        expiry: PropTypes.string,
      })
    ),
    settings: PropTypes.shape({
      font: PropTypes.string,
      colorScheme: PropTypes.shape({
        primary: PropTypes.string,
        secondary: PropTypes.string,
        accent: PropTypes.string,
        text: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ClassicTemplate;
