import React from 'react';
import './flight-search-info.css';

export const FlightSearchInfo = (props) => {
  const { origin, destination, date } = props.criteria;
  return (
    <section className="flight-search-info">
      <h3>{`${origin} to ${destination}`}</h3>
      <p>{props.count} flights found, {date}</p>
    </section>
  )
}