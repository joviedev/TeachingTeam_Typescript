export const formatJson = (json: string | null) => {
  try {
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const isEmpty = (value: any) => value === '' || value === null || value === undefined;
