import React from 'react';
import './flight-grid.css';
import { FlightSearchInfo } from './../flight-search-info/flight-search-info';
import { FlightInfo } from './../flight-info/flight-info';
import { MultiFlightInfo } from './../multi-flight-info/multi-flight-info';


const FlightsGrid = (props) => {
  const flights = props.flights || {};
  const flightsCount = (flights.nonStopFlights && flights.nonStopFlights.length) + (flights.multiStopFlights && flights.multiStopFlights.length)
  return (
    <div className="flights-info-container">
      {props.criteria && <FlightSearchInfo criteria={props.criteria} count={flightsCount || 0} />}
      {flights.nonStopFlights && flights.nonStopFlights.map(flight => <FlightInfo data={flight} />)}
      {flights.multiStopFlights && flights.multiStopFlights.map(flight => <MultiFlightInfo data={flight} />)}
    </div>
  );
}

export default FlightsGrid;

