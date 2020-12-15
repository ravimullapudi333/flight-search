import React from 'react';
import Box from '../../assets/images/box.png';

function FlightDetails(props) {
  const {
    name,
    flightNo,
    arrivalTime,
    date,
    departureTime,
    destination,
    origin,
    price,
    travelTime,
    multi = false
  } = props;
  return (
    <div className={`flight-details ${multi ? '' : 'border'}`}>
      <img className="box" src={Box} alt="" />

      <div className="desc">
        <span className="heading">{name}</span>
        <span className="sub-heading">{flightNo}</span>
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
        <span className="heading">{travelTime}</span>
        <span className="sub-heading">{!multi ? 'Non Stop' : '    '}</span>
      </div>

      <span className="currency">{!multi && price}</span>
      {!multi ? (
        <button className="book-btn ">Book</button>
      ) : (
        <div style={{ width: '120px' }}></div>
      )}
    </div>
  );
}

export default FlightDetails;
