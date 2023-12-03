//
function createTimeSlotsWithBreak(startTime, endTime, slotDuration, breakDuration) {
  const timeSlots = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    const nextTime = addMinutes(currentTime, slotDuration);

    timeSlots.push({
      start: currentTime,
      end: nextTime,
    });

    currentTime = addMinutes(nextTime, breakDuration);
  }

  return timeSlots;
}

function addMinutes(time, minutes) {
  const match = time.match(/(\d+):(\d+)([ap]m)/);
  if (!match) {
    // Handle invalid input, such as a null or improperly formatted time
    return null;
  }

  const [_, hours, minutesStr, period] = match;
  let newHours = parseInt(hours, 10);
  let newMinutes = parseInt(minutesStr, 10);
  let newPeriod = period;

  newMinutes += minutes;
  while (newMinutes >= 60) {
    newMinutes -= 60;
    newHours += 1;
  }

  if (newHours === 12 && newPeriod === "am") {
    newPeriod = "pm";
  }

  if (newHours > 12) {
    newHours -= 12;
    newPeriod = newPeriod === "am" ? "pm" : "am";
  }

  return `${newHours}:${newMinutes.toString().padStart(2, "0")}${newPeriod}`;
}

const formateDate = (date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date?.getMonth()];
  const formattedDate = `${month} ${date.getDate()} ${date.getFullYear()}`;
  return formattedDate;
};

module.exports = { createTimeSlotsWithBreak, formateDate };
