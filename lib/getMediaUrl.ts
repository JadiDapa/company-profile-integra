export function getMediaUrl(dbPath: string): string {
  if (!dbPath) return "";

  const cleanPath = dbPath.replace(/^\/+/, "");

  return `/api/${cleanPath}`;
}
