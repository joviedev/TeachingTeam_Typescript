/**
 * Safely parses a JSON string into an object.
 * 
 * - Returns `null` if input is empty or parsing fails.
 * - Helps prevent crashes due to malformed or missing JSON.
 * 
 * @param {string | null} json - The JSON string to parse.
 * @returns {any | null} Parsed object or null if invalid.
 */
export const formatJson = (json: string | null) => {
  try {
    if (!json) return null; // Return null for empty or null input
    return JSON.parse(json); // Attempt to parse the JSON string
  } catch {
    return null; // Return null if JSON is invalid or malformed
  }
}

/**
 * Utility function to check if a value is "empty".
 * 
 * - Treats empty string, null, and undefined as empty.
 * 
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if value is considered empty, else `false`.
 */
export const isEmpty = (value: any) => 
  value === '' || value === null || value === undefined; // Basic empty check
