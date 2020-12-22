import React from 'react';
import { mount } from 'enzyme';
import FlightDetails from '../FlightDetails';

describe('FlightDetails', () => {
  it('should render', () => {
    const flightDetails = mount(<FlightDetails></FlightDetails>);
    expect(flightDetails).toBeDefined();
  });
  it('should render without border if rendering under multi details', () => {
    const flightDetails = mount(<FlightDetails multi={true}></FlightDetails>);
    const detailElement = flightDetails.find('.flight-details');
    const classExists = detailElement.hasClass('border');
    expect(classExists).toBe(false);
  });
  it('should not have flight type if rendered under multi detail ', () => {
    const flightDetails = mount(<FlightDetails multi={true}></FlightDetails>);
    const timeDetails = flightDetails.find('.time-details .sub-heading');
    const text = timeDetails.text();
    expect(text).toBe('    ');
  });
});
