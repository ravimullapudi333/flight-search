import React, { useState } from 'react';

import { Search } from './search/Search';
import SearchInfo from './searchInfo/SearchInfo';
import FlightDetails from './flightDetails/FlightDetails';
import MultipleFlightDetails from './multiFlightDetails/MultiFlightDetails';

import { fetchFlightsData, getFilteredFlights } from '../services/flightService';

import flightImage from '../assets/images/flightImage.jpeg';

function App(props) {
  const [searchData, setSearchData] = useState({});
  const [flightsData, setFlightsData] = useState([]);
  const [onwardFlights, setOnwardFlights] = useState(null);
  const [returnFlights, setReturnFlights] = useState(null);

  React.useEffect(() => {
    getOnwardFlights();
    searchData.selectedTab === 'return' && getReturnFlights();
  }, [flightsData]);

  const onSubmit = async searchData => {
    try {
      setSearchData(searchData);
      const data = await fetchFlightsData();
      setFlightsData(data);
    } catch (error) {
      console.error('Unable to fetch flights data');
    }
  };
  const getOnwardFlights = () => {
    setOnwardFlights(
      getFilteredFlights({
        data: flightsData,
        travelDate: searchData.departureDate,
        originCity: searchData.originCity,
        destinationCity: searchData.destinationCity,
        passengers: searchData.passengers
      })
    );
  };

  const getReturnFlights = () => {
    setReturnFlights(
      getFilteredFlights({
        data: flightsData,
        travelDate: searchData.returnDate,
        destinationCity: searchData.originCity,
        originCity: searchData.destinationCity,
        passengers: searchData.passengers
      })
    );
  };

  return (
    <div className="main">
      <div className="header">Flight Search App</div>
      <div className="content">
        <div className="side">
          <Search onSubmit={onSubmit} />
        </div>
        <div className="main-content">
          {onwardFlights && onwardFlights.length > 0 ? (
            <SearchInfo
              data={[
                {
                  imgSrc: flightImage,
                  originCity: searchData.originCity,
                  destinationCity: searchData.destinationCity,
                  flightCount: onwardFlights.length,
                  departureDate: new Date(searchData.departureDate).toDateString(),
                  returnDate: new Date(searchData.returnDate).toDateString()
                },
                ...(searchData.selectedTab === 'return'
                  ? [
                      {
                        imgSrc: flightImage,
                        originCity: searchData.destinationCity,
                        destinationCity: searchData.originCity,
                        flightCount: returnFlights && returnFlights.length,
                        departureDate: new Date(searchData.returnDate).toDateString(),
                        returnDate: new Date(searchData.returnDate).toDateString()
                      }
                    ]
                  : [])
              ]}
            ></SearchInfo>
          ) : null}
          <div style={{ display: 'flex' }}>
            <div className="details">
              {onwardFlights &&
                onwardFlights.map((data, index) => {
                  return data.name !== 'Multiple' ? (
                    <FlightDetails key={data.flightNo + index} {...data}></FlightDetails>
                  ) : (
                    <MultipleFlightDetails
                      key={data.flightNo + index}
                      {...data}
                    ></MultipleFlightDetails>
                  );
                })}
            </div>
            {searchData.selectedTab === 'return' && (
              <div className="details">
                {returnFlights &&
                  returnFlights.map((data, index) => {
                    return data.name !== 'Multiple' ? (
                      <FlightDetails key={data.flightNo + index} {...data}></FlightDetails>
                    ) : (
                      <MultipleFlightDetails
                        key={data.flightNo + index}
                        {...data}
                      ></MultipleFlightDetails>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
