export function resolveImage(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('http')) return url;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  return `${apiUrl}${url}`;
}
