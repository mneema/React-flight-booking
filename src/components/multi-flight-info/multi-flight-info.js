import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DetailLabel } from './../detail-label/detail-label';
import { FlightInfo } from './../flight-info/flight-info';
import { PriceInfo } from './../price-info/price-info';
import { getTimeDifferece } from './../../lib/utils';
import multiFlightLogo from './../../assets/multiflight.png';
import './multi-flight-info.css';
import './../flight-info/flight-info.css';

const MultiFlightLogo = (props) => {
  return <img src={multiFlightLogo} alt="multiple flights logo" width="32" height="32" />
}

const LayoverInfo = (props) => {
  return (
    <p className="layover-info">
      Layover of {props.time}
    </p>
  )  
}

export const MultiFlightInfo = (props) => {
  const { cumulativeFlight: { departureTime, origin, arrivalTime, destination, totalFare, arrivalTimeStamp, departureTimeStamp, dayChange }, flights } = props.data;
  const [ showHideLabel, toggleLabel ] = useState('Show Details');
  const timeDiff = arrivalTimeStamp - departureTimeStamp;
  return (
    <Card>
      <section className="Flight-info">
        <MultiFlightLogo></MultiFlightLogo>
        <div className="detail-label">
          <h4>Multiple</h4>
          <a href="javascript:void(0)" onClick={() => toggleLabel( showHideLabel === 'Show Details' ? 'Hide Details' : 'Show Details') }>
            {showHideLabel}
          </a>
        </div>
        <DetailLabel mainText={departureTime} subText={origin} ></DetailLabel>
        <DetailLabel mainText={arrivalTime + (dayChange ? '(+1)': '')} subText={destination} ></DetailLabel>
        <DetailLabel mainText={getTimeDifferece(timeDiff)} subText={'Total Duration'} ></DetailLabel>
        <PriceInfo amount={totalFare} />
        <Button variant="outline-danger">Book</Button>
      </section>
      { showHideLabel === 'Hide Details' && flights.map((flight, index) => {
        const timeDiff = index < flights.length -1 ? flights[index+1].departureTimeStamp - flight.arrivalTimeStamp : null;
        return (
          <React.Fragment>
            <FlightInfo data={flight} isMultiMode={true} ></FlightInfo>
            {timeDiff && <LayoverInfo time={getTimeDifferece(timeDiff)}></LayoverInfo> }
          </React.Fragment>  
        );
      })}
    </Card>
  )
}
