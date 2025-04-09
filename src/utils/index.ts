export const formatJson = (json: string | null) => {
  try {
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}