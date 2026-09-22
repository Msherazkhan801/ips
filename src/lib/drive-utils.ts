/**
 * Google Drive URL & Image Processing Utilities
 * Converts Google Drive sharing links to direct embeddable CDN image URLs.
 * Stores lightweight URLs without consuming database storage quota.
 */

/**
 * Extract Google Drive file ID from various link formats
 */
export function extractGoogleDriveFileId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  // 1. Direct file ID if pasted (alphanumeric, dashes, underscores, typically 25-50 chars)
  if (/^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Standard /file/d/{id} or /d/{id} format
  const fileDMatch = trimmed.match(/\/(?:file\/d|d)\/([a-zA-Z0-9_-]{20,})/i);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // 3. Query parameter format: ?id={id} or &id={id}
  const idParamMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]{20,})/i);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }

  // 4. Google User Content format: lh3.googleusercontent.com/d/{id}
  const lh3Match = trimmed.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]{20,})/i);
  if (lh3Match && lh3Match[1]) {
    return lh3Match[1];
  }

  return null;
}

/**
 * Checks if a string is a Google Drive URL or Drive File ID
 */
export function isGoogleDriveUrl(input: string): boolean {
  if (!input) return false;
  const trimmed = input.trim();
  return (
    trimmed.includes('drive.google.com') ||
    trimmed.includes('docs.google.com') ||
    trimmed.includes('googleusercontent.com') ||
    /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)
  );
}

/**
 * Convert any Google Drive sharing link to a direct embeddable CDN image URL.
 * Google's `lh3.googleusercontent.com/d/{fileId}` provides high-performance, direct CDN delivery.
 */
export function formatGoogleDriveImageUrl(input: string): string {
  if (!input) return '';
  const trimmed = input.trim();

  const fileId = extractGoogleDriveFileId(trimmed);
  if (fileId) {
    // lh3.googleusercontent.com/d/{id} is the most reliable high-speed direct CDN endpoint
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return trimmed;
}

/**
 * Get fallback thumbnail URL for Google Drive images
 */
export function getGoogleDriveThumbnailUrl(input: string, size = 1000): string {
  const fileId = extractGoogleDriveFileId(input);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
  }
  return input;
}

/**
 * Get direct download/export URL for Google Drive images
 */
export function getGoogleDriveExportUrl(input: string): string {
  const fileId = extractGoogleDriveFileId(input);
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  return input;
}

/**
 * Checks if an image source is a huge base64 data URL
 */
export function isBase64DataUrl(input: string): boolean {
  return typeof input === 'string' && input.startsWith('data:image/');
}

/**
 * Estimate size savings from storing URL instead of Base64
 */
export function getBase64SizeEstimate(dataUrl: string): string {
  if (!isBase64DataUrl(dataUrl)) return '0 KB';
  const bytes = Math.round((dataUrl.length * 3) / 4);
  if (bytes > 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}
