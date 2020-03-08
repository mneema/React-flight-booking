export const transformFlightDates = (flights) => {
  return flights.map(flight => {
    return {
      ...flight,
      arrivalTimeStamp: new Date(`${flight.date} ${flight.arrivalTime}`).getTime(),
      departureTimeStamp: new Date(`${flight.date} ${flight.departureTime}`).getTime()
    }
  })
};

export const getTimeDifferece = (timeDiff) => {
  const timeInHrs = Math.floor((timeDiff) / 3600000);
  const timeInMins = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
  return `${timeInHrs}h ${timeInMins}m`;
}