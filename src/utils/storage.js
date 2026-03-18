const STORAGE_KEY = 'qr_list';

/**
 * Get all QR codes from localStorage
 * @returns {Array} Array of QR code objects
 */
export const getQRs = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

/**
 * Save QR codes to localStorage
 * @param {Array} qrs - Array of QR code objects
 */
export const saveQRs = (qrs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(qrs));
};
