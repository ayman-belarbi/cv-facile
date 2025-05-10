const STORAGE_KEY = 'saved_resumes';

export function saveResume(resume) {
  const savedResumes = getSavedResumes();
  const newResume = {
    id: resume.id || Date.now().toString(),
    title: resume.title || 'Untitled Resume',
    data: resume,
    lastModified: new Date().toISOString(),
  };

  const existingIndex = savedResumes.findIndex(r => r.id === newResume.id);
  if (existingIndex >= 0) {
    savedResumes[existingIndex] = newResume;
  } else {
    savedResumes.push(newResume);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedResumes));
  return newResume;
}

export function getSavedResumes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function getResumeById(id) {
  const savedResumes = getSavedResumes();
  return savedResumes.find(resume => resume.id === id);
}

export function deleteResume(id) {
  const savedResumes = getSavedResumes();
  const filteredResumes = savedResumes.filter(resume => resume.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResumes));
}

export function updateResume(id, newTitle) {
  const savedResumes = getSavedResumes();
  const updatedResumes = savedResumes.map(resume => {
    if (resume.id === id) {
      return { ...resume, title: newTitle };
    }
    return resume;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedResumes));
} 