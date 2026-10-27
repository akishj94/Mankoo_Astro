/* --------------------------------------------------
   AI-generated: Text utility functions for CMS data
   Provides safe text extraction from Sanity document data
 -------------------------------------------------- */

/**
 * Safely extracts and converts a value to string.
 * If the value is an array, it joins the elements.
 * If the value is null/undefined, returns empty string.
 * @param primary - Primary value to convert
 * @param fallback - Fallback value if primary is empty
 * @returns String representation of the value
 */
export function text(primary: string | null | undefined, fallback: string = ''): string {
  if (!primary) {
    return typeof fallback === 'string' ? fallback : String(fallback);
  }
  return String(primary);
}

/**
 * Safely extracts text from Sanity document data.
 * Handles cases where data might be arrays or objects.
 * @param data - Sanity document data field
 * @returns String value or empty string
 */
export function sanitizeText(data: unknown): string {
  if (data === null || data === undefined) {
    return '';
  }
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(item => typeof item === 'object' ? item?.title || item?.name || String(item) : String(item)).join(', ');
  }
  if (typeof data === 'object') {
    return data.title || data.name || String(data);
  }
  return String(data);
}