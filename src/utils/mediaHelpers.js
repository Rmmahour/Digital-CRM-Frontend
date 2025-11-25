// Get the base URL from environment or use default
const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://digitalcrm.abacusdesk.com';

/**
 * Convert relative image paths to full URLs
 * Handles both relative paths (/uploads/...) and full URLs
 */
export const getImageUrl = (url) => {
  if (!url) return null;
  
  // If it's already a full URL (starts with http:// or https://), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Fix localhost URLs in production
    if (import.meta.env.PROD && url.includes('localhost')) {
      return url.replace(/http:\/\/localhost:\d+/, API_BASE_URL);
    }
    return url;
  }
  
  // If it's a relative path, prepend the base URL
  if (url.startsWith('/')) {
    return `${API_BASE_URL}${url}`;
  }
  
  // If it doesn't start with /, add it
  return `${API_BASE_URL}/${url}`;
};

/**
 * Get avatar URL with fallback
 */
export const getAvatarUrl = (user) => {
  if (!user) return null;
  
  if (user.avatar) {
    return getImageUrl(user.avatar);
  }
  
  // Return initials or default avatar
  return null;
};

/**
 * Fix all image URLs in existing data
 */
export const fixImageUrls = (data) => {
  if (!data) return data;
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => fixImageUrls(item));
  }
  
  // Handle objects
  if (typeof data === 'object') {
    const fixed = { ...data };
    
    // Fix common image fields
    if (fixed.avatar) {
      fixed.avatar = getImageUrl(fixed.avatar);
    }
    if (fixed.profileImage) {
      fixed.profileImage = getImageUrl(fixed.profileImage);
    }
    if (fixed.image) {
      fixed.image = getImageUrl(fixed.image);
    }
    if (fixed.url && (fixed.type === 'IMAGE' || fixed.type === 'image')) {
      fixed.url = getImageUrl(fixed.url);
    }
    
    return fixed;
  }
  
  return data;
};