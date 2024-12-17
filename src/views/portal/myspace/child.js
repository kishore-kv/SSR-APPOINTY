import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css"; // Flatpickr's light theme
import "./AppointmentPage.css"; // Custom CSS for UI adjustments
 
const CustomTimePicker = () => {
  const [selectedTime, setSelectedTime] = useState("");
 
  const options = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K", // Time format like 07:00 PM
    minuteIncrement: 15, // Increment time by 15 minutes
    time_24hr: false,
    inline: true, // Show the dropdown inline (like in your image)
    onChange: (selectedDates, dateStr) => {
      setSelectedTime(dateStr);
    },
  };
 
  return (
<div className="custom-time-picker">
<input
        type="text"
        placeholder="Select Time"
        value={selectedTime}
        readOnly
        className="time-input"
      />
<div className="time-dropdown">
<Flatpickr options={options} />
</div>
</div>
  );
};
 
export default CustomTimePicker;

 