import React, { useState } from 'react';

function Search(props) {
  const [selectedTab, setSelectedTab] = useState('oneWay');
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(0);
  const [data, setData] = useState(null);
  const tabs = [
    {
      key: 'oneWay',
      text: 'One Way'
    },
    {
      key: 'return',
      text: 'Return'
    }
  ];

  const cities = ['Pune (PNQ)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Delhi (DEL)'];
  const onTabClick = key => {
    setSelectedTab(key);
  };

  const onSubmit = () => {
    props.onSubmit({
      selectedTab,
      originCity,
      destinationCity,
      departureDate,
      returnDate,
      passengers
    });
  };

  const onDateFocus = e => {
    e.target.type = 'date';
  };
  const onDateBlur = e => {
    e.target.type = 'text';
  };
  return (
    <div className="side-content">
      <div className="tab">
        {tabs.map(tab => {
          return (
            <button
              key={tab.key}
              className={`${selectedTab === tab.key ? 'active' : ''}`}
              onClick={() => onTabClick(tab.key)}
            >
              {tab.text}
            </button>
          );
        })}
      </div>
      <div className={`tab-content`}>
        <input
          className="element"
          list="originCity"
          name="originCity"
          placeholder="Enter Origin City"
          value={originCity}
          onChange={e => setOriginCity(e.target.value)}
        />
        <datalist id="originCity">
          {cities.map(city => (
            <option key={city} value={city}></option>
          ))}
        </datalist>
        <input
          className="element"
          list="destinationCity"
          name="destinationCity"
          placeholder="Enter Destination city"
          value={destinationCity}
          onChange={e => setDestinationCity(e.target.value)}
        />
        <datalist id="destinationCity">
          {cities.map(city => {
            if (city !== originCity) {
              return <option key={city} value={city}></option>;
            }
          })}
        </datalist>

        <input
          className="element"
          id="departureDate"
          placeholder="Departure Date"
          value={departureDate}
          type="text"
          onFocus={onDateFocus}
          onBlur={onDateBlur}
          onChange={e => setDepartureDate(e.target.value)}
        ></input>

        {selectedTab === 'return' && (
          <input
            className="element"
            id="returnDate"
            placeholder="Return Date"
            value={returnDate}
            type="text"
            onFocus={onDateFocus}
            onBlur={onDateBlur}
            onChange={e => setReturnDate(e.target.value)}
          ></input>
        )}
        <select
          onChange={e => setPassengers(e.target.value)}
          className="element"
          id="passengers"
          name="passengers"
          value={passengers}
        >
          <option value={0} disabled>
            Select Passengers
          </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <button className="element" onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  );
}

export { Search };
