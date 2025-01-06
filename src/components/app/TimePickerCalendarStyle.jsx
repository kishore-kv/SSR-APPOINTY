import React, { useState } from "react";
import { Clock } from "@phosphor-icons/react";
import { CFormInput } from "@coreui/react";
import "./Timpickr.css";
import { formatTime , convertToAMPM} from "../../utils/storage";

const TimePickerCalendarStyle = ({ value, onTimeChange, availableTime,blockedAppointments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    if (!startTime || !endTime) return slots;
  
    const [startHour, startMinute, startSecond] = startTime.split(":").map(Number);
    const [endHour, endMinute, endSecond] = endTime.split(":").map(Number);
  
    const start = new Date();
    start.setHours(startHour, startMinute, startSecond, 0);
  
    const end = new Date();
    end.setHours(endHour, endMinute, endSecond, 0);
  
    // Handle case when the start time is after the end time (next day)
    if (start > end) {
      end.setDate(end.getDate() + 1); // Move the end time to the next day
    }
  
    // Generate time slots in 15-minute intervals
    while (start <= end) {
      slots.push({time:formatTime(start), status:'available'}); // Assuming `formatTime` exists
      start.setMinutes(start.getMinutes() + 15); // Increment by 15 minutes
    }
  
    return slots;
  };
       const timeSlots = generateTimeSlots(availableTime.startTime , availableTime.endTime)
     
       // Mark blocked slots
      //  / Function to mark blocked time slots with 'b'
       const markBlockedSlots = (timeSlots, blockedSlots) => {
         return timeSlots.map(slot => {
           const slotDate = new Date();
           const [hour, minute] = slot.time.split(":").map(Number);
           slotDate.setHours(hour, minute, 0, 0);
       
           // Check if the slot falls within any of the blocked intervals
           const isBlocked = blockedSlots.some(interval => {
             const intervalStart = new Date();
             const [startHour, startMinute, startSecond] = interval.startTime.split(":").map(Number);
             intervalStart.setHours(startHour, startMinute, startSecond, 0);
       
             const intervalEnd = new Date();
             const [endHour, endMinute, endSecond] = interval.endTime.split(":").map(Number);
             intervalEnd.setHours(endHour, endMinute, endSecond, 0);
       
             return slotDate >= intervalStart && slotDate < intervalEnd;
           });
       
           // If the slot is blocked, append 'b' to the slot
           return isBlocked ? {...slot ,status:'blocked'} : slot;
         });
       };
       
      
  
      const updatedSlots = markBlockedSlots(timeSlots , blockedAppointments)

  

  const handleTimeSelect = (slot) => {
    // if (isDisabled(time)) return; // Prevent selection if time is disabled
     console.log(`time`,slot.status);
     if(slot.status === 'blocked') return;
    setInputValue(convertToAMPM(slot.time));
    setSelectedTime(slot.time);
    onTimeChange(slot.time);
    setIsOpen(false);
  };

  return (
    <div className="position-relative px-3">
      {/* Input field with calendar icon */}
      <div className="d-flex align-items-center">
        <Clock
          size={"1.5rem"}
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <CFormInput
          type="text"
          className="form-control timepickr"
          value={inputValue}
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
            {updatedSlots.map((slot, index) => (
              <div
                key={index}
                className={`p-2 text-center small rounded ${
                  slot.status === 'blocked'
                    ? "text-muted bg-light"
                    : selectedTime === slot.time
                    ? "bg-primary text-white"
                    : "text-body hover-bg-light"
                }`}
                style={{
                  cursor: slot.status === 'blocked' ? "not-allowed" : "pointer",
                  // pointerEvents: isDisabled(time) ? "none" : "auto",
                }}
                onClick={() => handleTimeSelect(slot)}
              >
                {convertToAMPM(slot.time)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerCalendarStyle;
