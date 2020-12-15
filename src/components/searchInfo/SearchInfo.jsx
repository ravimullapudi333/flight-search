import React from 'react';

function SearchInfo(props) {
  return (
    <div className="search-info">
      {props.data.map((item, index) => {
        return (
          <div key={props.originCity + index} className="search-info-item">
            <img src={item.imgSrc} />
            <div className="info">
              <div className="city-info">
                {' '}
                {item.originCity} to {item.destinationCity}
              </div>
              <div>
                <span className="date-info">
                  {item.flightCount} flights found {item.departureDate}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SearchInfo;
