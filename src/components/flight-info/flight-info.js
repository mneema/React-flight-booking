import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DetailLabel } from './../detail-label/detail-label';
import { PriceInfo } from './../price-info/price-info';
import nonStopFlightLogo from './../../assets/nonstop.png';
import { getTimeDifferece } from './../../lib/utils';
import './flight-info.css';

const FlightLogo = (props) => {
  return <img src={nonStopFlightLogo} width="32" height="32"></img>
}

export const FlightInfo = (props) => {
  const { name, flightNo, departureTime, origin, arrivalTime, destination, price, date  } = props.data;
  const isMultiMode = props.isMultiMode;
  const timeDiff = new Date(`${date} ${arrivalTime}`) - new Date(`${date} ${departureTime}`);
  
  return (
    <Card>
      <section className={`Flight-info ${isMultiMode ? 'gray-background' : ''}`}>
        <FlightLogo></FlightLogo>
        <DetailLabel mainText={name} subText={flightNo} ></DetailLabel>
        <DetailLabel mainText={departureTime} subText={origin} ></DetailLabel>
        <DetailLabel mainText={arrivalTime} subText={destination} ></DetailLabel>
        <DetailLabel mainText={getTimeDifferece(timeDiff)} subText={isMultiMode ? '' : 'Non stop'} ></DetailLabel>
        {isMultiMode ? null : <PriceInfo amount={price} />}
        {isMultiMode ? null : <Button variant="outline-danger">Book</Button>}
      </section>
    </Card>
  )
}