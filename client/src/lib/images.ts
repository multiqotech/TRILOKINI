const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function resolveImage(url?: string): string {
  if (!url) return PLACEHOLDER;
  if (url.startsWith("http") || url.startsWith("/images/") || url.startsWith("/logos/") || url.startsWith("/icons/")) {
    return url;
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return `${apiUrl}${url}`;
}

export { PLACEHOLDER };
