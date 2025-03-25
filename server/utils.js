export const getCookie = (cname, cookies) => {
  let name = cname + "=";
  let decodedCookie = cookies;
  let ca = decodedCookie && decodedCookie.split(';') || '';
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

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

export const generateSignedUrl = async (storage, bucketName, fileURL, expiresInMinutes = 15) => {
  try {
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000, // Expiry time
    };

    const parts = fileURL.split(`/${bucketName}`);
    const fileName = parts[1].startsWith("/") ? parts[1].substring(1) : parts[1];

    // Generate the signed URL
    const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl(options);
    return url;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Error generating signed URL'); // Throw error instead of sending response
  }
};

export const deleteFolder = async (storage, bucket, vinNumber) => {
  if (!vinNumber) {
    console.error('VIN is required for deletion');
    return;
  }

  const folderPrefixes = [`${vinNumber}/inspection/`, `${vinNumber}/anomaly/`];

  try {
    for (const folderPrefix of folderPrefixes) {
      const [files] = await bucket.getFiles({ prefix: folderPrefix });

      if (files.length === 0) {
        console.log(`No files found in the specified folder: ${folderPrefix}`);
        continue; 
      }

      await Promise.all(files.map(file => file.delete()));
      console.log(`All files in folder ${folderPrefix} have been deleted`);
    }
  }catch (error) {
    console.error('Error deleting files:', error);
  }
};
