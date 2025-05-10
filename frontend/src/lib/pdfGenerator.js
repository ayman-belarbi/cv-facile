import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(resumeData, template) {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(24);
  doc.text(resumeData.personalInfo.name, 20, 20);
  
  // Add contact information
  doc.setFontSize(12);
  doc.text([
    resumeData.personalInfo.email,
    resumeData.personalInfo.phone,
    resumeData.personalInfo.location
  ].filter(Boolean).join(' | '), 20, 30);
  
  // Add summary
  if (resumeData.personalInfo.summary) {
    doc.setFontSize(14);
    doc.text('Summary', 20, 40);
    doc.setFontSize(12);
    doc.text(resumeData.personalInfo.summary, 20, 50);
  }
  
  // Add experience
  if (resumeData.experience && resumeData.experience.length > 0) {
    doc.setFontSize(14);
    doc.text('Experience', 20, 70);
    doc.setFontSize(12);
    
    resumeData.experience.forEach((exp, index) => {
      const y = 80 + (index * 30);
      doc.text(`${exp.title} at ${exp.company}`, 20, y);
      doc.text(`${exp.startDate} - ${exp.endDate}`, 20, y + 7);
      doc.text(exp.description, 20, y + 14);
    });
  }
  
  // Add education
  if (resumeData.education && resumeData.education.length > 0) {
    doc.setFontSize(14);
    doc.text('Education', 20, 150);
    doc.setFontSize(12);
    
    resumeData.education.forEach((edu, index) => {
      const y = 160 + (index * 20);
      doc.text(`${edu.degree} in ${edu.field}`, 20, y);
      doc.text(`${edu.school} (${edu.startDate} - ${edu.endDate})`, 20, y + 7);
    });
  }
  
  // Add skills
  if (resumeData.skills && resumeData.skills.length > 0) {
    doc.setFontSize(14);
    doc.text('Skills', 20, 200);
    doc.setFontSize(12);
    doc.text(resumeData.skills.map(skill => skill.name).join(', '), 20, 210);
  }
  
  return doc;
} 