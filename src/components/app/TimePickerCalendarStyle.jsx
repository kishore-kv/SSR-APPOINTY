import React, { useState } from "react";
import { Clock } from "@phosphor-icons/react";
import { CFormInput } from "@coreui/react";
import './Timpickr.css';

const TimePickerCalendarStyle = ({value , onTimeChange , availableTime}) => {
  console.log(`available`, availableTime);
  
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  // const [inputValue, setInputValue] = useState("");

  // Generate time slots from 12:00 AM to 11:45 PM in 15-min intervals

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  const generateTimeSlots = (startTime , endTime) => {
    const slots = [];
     if(!startTime || !endTime) return slots;
    const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
    const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);
    const start = new Date();
  start.setHours(startHour, startMinute, startSecond, 0);

  const end = new Date();
  end.setHours(endHour, endMinute, endSecond, 0);



  while (start <= end) {
    // console.log(`start`,start);
    
    slots.push(formatTime(start));
    start.setMinutes(start.getMinutes() + 15);
  }
    return slots;
  };

  const timeSlots = availableTime && generateTimeSlots(availableTime.startTime , availableTime.endTime);
  // console.log(`slots`,timeSlots);
  

  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    onTimeChange(time);
    setIsOpen(false);
  };

  return (
    <div className="position-relative px-3">
      {/* Input field with calendar icon */}
      <div className="d-flex align-items-center"
      // className="position-relative"
      >

       <Clock
          // className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
          size={"1.5rem"}
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <CFormInput
          type="text"
          className="form-control timepickr"
          value={value}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />
       
      </div>

      {/* Time picker dropdown */}
      {isOpen && (
        <div
          className="position-absolute mt-1 bg-white border rounded shadow"
          style={{ width: "100%", zIndex: 1050 }}
        >
          <div className="bg-light border-bottom p-2">
            <h3 className="h6 text-muted mb-0">Select Time</h3>
          </div>

          <div
            className="d-grid p-2 overflow-auto"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", maxHeight: "16rem" }}
          >
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`p-2 text-center small rounded cursor-pointer ${
                  selectedTime && selectedTime === time
                    ? "bg-primary text-white"
                    : "text-body hover-bg-light"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerCalendarStyle;
