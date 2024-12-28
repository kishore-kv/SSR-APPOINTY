import React, { useState } from "react";
import { Clock } from "@phosphor-icons/react";

const TimePickerCalendarStyle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Define disabled times
  const disabledTimes = ["12:15 AM", "3:30 AM", "6:45 PM"]; // Add specific times to disable

  // Generate time slots from 12:00 AM to 11:45 PM in 15-min intervals
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0);

    for (let i = 0; i < 24 * 4; i++) {
      const time = new Date(startTime);
      slots.push(time);
      startTime.setMinutes(startTime.getMinutes() + 15);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isTimeDisabled = (time) => {
    const formattedTime = formatTime(time);
    return disabledTimes.includes(formattedTime);
  };

  const handleTimeSelect = (time) => {
    if (isTimeDisabled(time)) return; // Prevent selection of disabled times
    setSelectedTime(time);
    setInputValue(formatTime(time));
    setIsOpen(false);
  };

  return (
    <div className="position-relative" style={{ width: "18rem" }}>
      {/* Input field with calendar icon */}
      <div className="position-relative">
        <input
          type="text"
          className="form-control"
          placeholder="Select time"
          value={inputValue}
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />
        <Clock
          className="position-absolute top-50 end-0 translate-middle-y me-2 text-muted"
          style={{ cursor: "pointer" }}
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
            {timeSlots.map((time, index) => {
              const disabled = isTimeDisabled(time);
              return (
                <div
                  key={index}
                  className={`p-2 text-center small rounded ${
                    disabled
                      ? "bg-secondary text-white"
                      : selectedTime &&
                        selectedTime.getTime() === time.getTime()
                      ? "bg-primary text-white"
                      : "text-body hover-bg-light"
                  }`}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.6 : 1,
                  }}
                  onClick={() => handleTimeSelect(time)}
                >
                  {formatTime(time)}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerCalendarStyle;
