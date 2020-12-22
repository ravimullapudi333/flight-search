import React from 'react';
import { mount } from 'enzyme';
import MultipleFlightDetails from '../MultiFlightDetails';

describe('MultipleFlightDetails', () => {
  it('should render', () => {
    const multipleFlightDetails = mount(<MultipleFlightDetails></MultipleFlightDetails>);
    expect(multipleFlightDetails).toBeDefined();
  });
  it('should render text as hide details on click of show details', () => {
    const setShowDetail = jest.fn();
    const useState = jest.spyOn(React, 'useState').mockImplementation(() => [false, setShowDetail]);
    const multipleFlightDetails = mount(
      <MultipleFlightDetails details={[{}]}></MultipleFlightDetails>
    );
    const showDetail = multipleFlightDetails.find('.show-detail');
    showDetail.simulate('click');
    expect(showDetail.text()).toBe('Hide details');
  });
});
