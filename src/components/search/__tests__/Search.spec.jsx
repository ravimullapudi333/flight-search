import React from 'react';
import { mount } from 'enzyme';
import { Search } from '../Search';

describe('Search', () => {
  it('should render', () => {
    const search = mount(<Search></Search>);
    expect(search).toBeDefined();
  });

  it('should set selected tab on click of tab', () => {
    const setSelectedTab = jest.fn();
    const useState = jest
      .spyOn(React, 'useState')
      .mockImplementation(() => ['oneWay', setSelectedTab]);
    const search = mount(<Search></Search>);
    const returnTab = search.find('#return');
    returnTab.simulate('click');
    expect(setSelectedTab).toBeCalledWith('return');
    useState.mockRestore();
  });

  it('should call onSubmit on click of search button', () => {
    let submitClicked = false;
    const submitClick = () => {
      submitClicked = true;
    };
    const search = mount(<Search onSubmit={submitClick}></Search>);
    const submitBtn = search.find('#search-submit');
    submitBtn.simulate('click');
    expect(submitClicked).toBe(true);
  });

  it('should change input type to date on focus', () => {
    const search = mount(<Search></Search>);
    const departureDate = search.find('#departureDate');
    const event = { target: { type: 'text' } };
    departureDate.props().onFocus(event);
    expect(event.target.type).toBe('date');
  });
  it('should change input type to text on blur', () => {
    const search = mount(<Search></Search>);
    const departureDate = search.find('#departureDate');
    const event = { target: { type: 'date' } };
    departureDate.props().onBlur(event);
    expect(event.target.type).toBe('text');
  });
  it('should set originCity on change of originCity', () => {
    const setOriginCity = jest.fn();
    const useState = jest.spyOn(React, 'useState').mockImplementation(() => ['', setOriginCity]);
    const search = mount(<Search></Search>);
    const originInput = search.find('#search-origin');
    const event = { target: { value: 'pune' } };
    originInput.props().onChange(event);
    expect(setOriginCity).toBeCalledWith('pune');
    useState.mockRestore();
  });

  it('should set destinationCity on change of destinationCity', () => {
    const setDestinationCity = jest.fn();
    const useState = jest
      .spyOn(React, 'useState')
      .mockImplementation(() => ['', setDestinationCity]);
    const search = mount(<Search></Search>);
    const departureInput = search.find('#search-destination');
    const event = { target: { value: 'delhi' } };
    departureInput.props().onChange(event);
    expect(setDestinationCity).toBeCalledWith('delhi');
    useState.mockRestore();
  });

  it('should set departureDate on change of departureDate', () => {
    const setDepartureDate = jest.fn();
    const useState = jest.spyOn(React, 'useState').mockImplementation(() => ['', setDepartureDate]);
    const search = mount(<Search></Search>);
    const departureDateInput = search.find('#departureDate');
    const event = { target: { value: '01/11/2020' } };
    departureDateInput.props().onChange(event);
    expect(setDepartureDate).toBeCalledWith('01/11/2020');
    useState.mockRestore();
  });
  it('should set passengers on change of passengers', () => {
    const setPassengers = jest.fn();
    const useState = jest.spyOn(React, 'useState').mockImplementation(() => [0, setPassengers]);
    const search = mount(<Search></Search>);
    const departureDateInput = search.find('#passengers');
    const event = { target: { value: 2 } };
    departureDateInput.props().onChange(event);
    expect(setPassengers).toBeCalledWith(2);
    useState.mockRestore();
  });
  // it.only('should set returnDate on change of returnDate', async () => {
  //   const setSelectedTab = jest.fn();
  //   const setReturnDate = jest.fn();

  //   const useState = jest
  //     .spyOn(React, 'useState')
  //     .mockImplementationOnce(() => ['return', setSelectedTab])
  //     .mockImplementationOnce(() => ['', setReturnDate]);
  //   const search = mount(<Search></Search>);
  //   const searchEle = search.find('#return');
  //   searchEle.simulate('click');
  //   const returnDateInput = search.find('#returnDate');
  //   const event = { target: { value: '01/11/2020' } };
  //   returnDateInput.props().onChange(event);
  //   console.log('value ====>', returnDateInput.props().value);
  //   expect(returnDateInput.props().value).toBe('01/11/2020');
  //   useState.mockRestore();

  //   useState1.mockRestore();
  // });
});
