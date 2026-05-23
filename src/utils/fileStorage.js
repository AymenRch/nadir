// File Storage Utility
// Manages uploaded files and artwork registrations

const UPLOADS_FOLDER = "uploads/";
const ARTWORKS_FILE = "artworks.json";

/**
 * Store uploaded file in localStorage
 * @param {File} file - The file to store
 * @param {string} filename - Optional custom filename
 * @returns {string} - File path reference
 */
export const storeUploadedFile = (file, filename = null) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const fileData = {
        name: filename || file.name,
        type: file.type,
        size: file.size,
        data: event.target.result, // Base64 encoded data
        timestamp: new Date().toISOString(),
      };
      
      // Generate unique file path
      const uniqueId = Date.now();
      const filePath = `${UPLOADS_FOLDER}${uniqueId}_${file.name}`;
      
      // Store in localStorage
      try {
        localStorage.setItem(`file_${filePath}`, JSON.stringify(fileData));
        resolve(filePath);
      } catch (error) {
        reject(new Error("Failed to store file: " + error.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    
    reader.readAsDataURL(file);
  });
};

/**
 * Retrieve uploaded file from localStorage
 * @param {string} filePath - File path reference
 * @returns {object|null} - File data or null if not found
 */
export const getUploadedFile = (filePath) => {
  const fileData = localStorage.getItem(`file_${filePath}`);
  return fileData ? JSON.parse(fileData) : null;
};

/**
 * Save artwork to the artworks list
 * @param {object} artwork - Artwork object
 * @returns {object} - Saved artwork with id and metadata
 */
export const saveArtwork = (artwork) => {
  // Get existing artworks
  const artworksData = localStorage.getItem(ARTWORKS_FILE);
  let artworks = artworksData ? JSON.parse(artworksData) : [];
  
  // Create artwork entry with metadata
  const newArtwork = {
    id: Date.now(),
    title: artwork.workTitle,
    artist: artwork.name,
    email: artwork.email,
    phone: artwork.phone,
    profession: artwork.profession,
    file: artwork.filePath,
    status: "pending",
    date: new Date().toLocaleDateString("fr-FR"),
    registeredAt: new Date().toISOString(),
  };
  
  // Add to artworks array
  artworks.push(newArtwork);
  
  // Save back to localStorage
  localStorage.setItem(ARTWORKS_FILE, JSON.stringify(artworks));
  
  return newArtwork;
};

/**
 * Get all artworks
 * @returns {array} - Array of all artworks
 */
export const getAllArtworks = () => {
  const artworksData = localStorage.getItem(ARTWORKS_FILE);
  return artworksData ? JSON.parse(artworksData) : [];
};

/**
 * Update artwork status
 * @param {number} id - Artwork ID
 * @param {string} status - New status
 * @returns {boolean} - Success flag
 */
export const updateArtworkStatus = (id, status) => {
  const artworksData = localStorage.getItem(ARTWORKS_FILE);
  if (!artworksData) return false;
  
  let artworks = JSON.parse(artworksData);
  const artwork = artworks.find(a => a.id === id);
  
  if (artwork) {
    artwork.status = status;
    localStorage.setItem(ARTWORKS_FILE, JSON.stringify(artworks));
    return true;
  }
  
  return false;
};

/**
 * Clear all uploaded files (cleanup)
 */
export const clearUploadedFiles = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith("file_" + UPLOADS_FOLDER)) {
      localStorage.removeItem(key);
    }
  });
};

/**
 * Export artworks as JSON file
 * @returns {string} - JSON string of artworks
 */
export const exportArtworksAsJSON = () => {
  return localStorage.getItem(ARTWORKS_FILE) || "[]";
};
