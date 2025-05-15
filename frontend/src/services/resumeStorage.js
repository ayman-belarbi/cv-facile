const API_URL = import.meta.env.VITE_API_URL + '/resumes';

export async function fetchResumes(token) {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch resumes');
  return await res.json();
}

export async function fetchResumeById(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch resume');
  return await res.json();
}

export async function createResume({ title, data }, token) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, data })
  });
  if (!res.ok) throw new Error('Failed to create resume');
  return await res.json();
}

export async function updateResume(id, { title, data }, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, data })
  });
  if (!res.ok) throw new Error('Failed to update resume');
  return await res.json();
}

export async function deleteResume(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to delete resume');
  return await res.json();
}