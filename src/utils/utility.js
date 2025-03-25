// Utility function to validate a 10-digit numeric input
export const validatePhoneNumber = (input) => {
    const isValid = /^\d{0,10}$/.test(input); // Allows only numeric characters up to 10 digits
    return isValid;
};

// Utility function to validate only - alphanumeric input
export const validateAlphanumeric = (input) => {
    const isValid = /^[a-zA-Z0-9]*$/.test(input); // Allows only letters (a-z, A-Z) and numbers (0-9)
    return isValid;
};

// Utility function to validate only - alphanumeric input with spanish accents
export const validateAlphanumericWithAccents = (input) => {
    const isValid = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]*$/.test(input);
    return isValid;
};

// Utility function to validate alphanumeric input with Spanish accents and specific special characters
export const validateAlphanumericWithAccentsAndSpecialChars = (input) => {
    const isValid = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s!#$%&@*?._-]*$/.test(input);
    return isValid;
};

// Utility function to validate alphanumeric input with specific special characters
export const validateAlphanumericWithSpecialChars = (input) => {
    const isValid = /^[a-zA-Z0-9\s!#$%&@*?._-]*$/.test(input);
    return isValid;
};


// Utility function to EncodeBase64
export const handleEncode = (value) => {
    const base64Encoded = btoa(value); // btoa() encodes to Base64
    return base64Encoded;
};

// Utility function to DecodeBase64
export const handleDecode = (value) => {
    try {
        const base64Decoded = atob(value); // atob() decodes from Base64
        return base64Decoded;
    } catch (error) {
        console.log('Invalid Base64 string');
    }
};

// Function to convert base64 to Blob
export const base64ToBlob = (base64String, mimeType) => {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([byteArray], { type: mimeType });
};

// Utility function to validate mileage(maximum: 4numbers, maximum: 2decimals)

export const validateMileage = (value) => {
    return /^\d{0,4}(\.\d{0,2})?$/.test(value);
};



export function convertToDate(dateString) {
    if(!dateString) return;
    // Split the date string into day, month, and year
    const [day, month, year] = dateString?.split('/').map(Number);
    // Create and return a Date object (months are 0-based in JS)
    return new Date(year, month - 1, day);
}
