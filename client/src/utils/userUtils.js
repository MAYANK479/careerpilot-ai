export function resolveCandidateName(user) {
  if (!user) return 'Candidate';
  const rawName = (user.name || '').trim();
  if (
    rawName &&
    rawName !== 'Candidate' &&
    rawName !== 'Google User' &&
    !rawName.toLowerCase().includes('alex rivera')
  ) {
    return rawName.replace(/\s*\(Google\)$/i, '').trim();
  }

  const email = user.email || '';
  if (email) {
    const prefix = email.split('@')[0];
    const clean = prefix.replace(/[._-]+/g, ' ').replace(/\d+/g, '').trim();
    if (clean) {
      return clean
        .split(/\s+/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
    }
    return prefix;
  }
  return 'Candidate';
}

export function getCandidateInitials(name) {
  if (!name) return 'CP';
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}
