// Save data to sessionStorage
export const setToSession = (key, value) => sessionStorage.setItem(key, value)

// Get saved data from sessionStorage
export const getFromSession = (key) => sessionStorage.getItem(key)

// Remove saved data from sessionStorage
export const removeFromSession = (key) => sessionStorage.removeItem(key)

// Remove all saved data from sessionStorage
export const clearAllFromSession = () => sessionStorage.clear()

export const setToLocal = (key, value) => localStorage.setItem(key, value)

export const getFromLocal = (key) => localStorage.getItem(key)

// Remove saved data from sessionStorage
export const removeFromLocal = (key) => localStorage.removeItem(key)

// Remove all saved data from sessionStorage
export const clearAllFromLocal = () => localStorage.clear()

export const setCookie = (cname, cvalue, exmins) => {
  const d = new Date()
  d.setTime(d.getTime() + exmins * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

export const getCookie = (cname) => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}


export const convertToAMPM = (timeString) => {
  // Split the timeString into components
  const [hours, minutes, seconds] = timeString.split(':').map(Number);

  // Determine whether it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert 24-hour format to 12-hour format
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for AM (12:00)
  
  // Format the time in hh:mm:ss AM/PM format
  const formattedTime = `${adjustedHours}:${String(minutes).padStart(2, '0')} ${period}`;

  return formattedTime;
};



// Validate form fields
export const validate = (formData , validationErrors) => {
  // let validationErrors = {};
  if (!formData.date) {
    validationErrors.date = 'Name is required';
  }
  if (!formData.customerEmail) {
    validationErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
    validationErrors.email = 'Email is invalid';
  }
  if (!formData.locationId) {
    validationErrors.location = 'Location is required';
  } 

  if (!formData.serviceId) {
    validationErrors.service = 'Service is required';
  }
  if (!formData.staffId) {
    validationErrors.staff = 'Staff is required';
  }
  if (!formData.startTime) {
    validationErrors.time = 'Time is required';
  }
  return validationErrors;
};



export const formatTime = (isoString) => {
  const date = new Date(isoString); // Parse the ISO string into a Date object
  const hours = String(date.getHours()).padStart(2, '0'); // Get hours in 2-digit format
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes in 2-digit format
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds in 2-digit format
  return `${hours}:${minutes}:${seconds}`; // Return formatted time
};