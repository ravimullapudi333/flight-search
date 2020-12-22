import React, { useState } from 'react';
import FlightDetails from '../flightDetails/FlightDetails';
import Multiple from '../../assets/images/multiple.png';

function MultipleFlightDetails(props) {
  const {
    name,
    arrivalTime,
    date,
    departureTime,
    destination,
    origin,
    price,
    details,
    travelTime,
    layOverTime
  } = props;
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className="multi-flight">
      <div className={`${showDetail ? 'bottom-border' : ''} flight-details`}>
        <img className="box" src={Multiple} alt="" />

        <div className="desc">
          <span className="heading">{name}</span>
          <div onClick={() => setShowDetail(!showDetail)} className="show-detail">
            {!showDetail ? 'Show details' : 'Hide details'}
          </div>
        </div>
        <div className="desc">
          <span className="heading">{departureTime}</span>
          <span className="sub-heading">{origin}</span>
        </div>
        <div className="desc">
          <span className="heading">{arrivalTime}</span>
          <span className="sub-heading">{destination}</span>
        </div>
        <div className="desc">
          <span className="travel-time">{travelTime}</span>
          <span className="sub-heading">Total duration</span>
        </div>

        <span className="currency">{price}</span>
        <button className="book-btn ">Book</button>
      </div>
      <div className="multi-detail">
        {details &&
          showDetail &&
          details.map((detail, index) => {
            return (
              <div key={index}>
                <FlightDetails {...detail} multi={true}></FlightDetails>
                {index === 0 ? (
                  <div>
                    <div className="dashed-line"></div>
                    <div className="layover-time "> Layover time {layOverTime}</div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MultipleFlightDetails;
