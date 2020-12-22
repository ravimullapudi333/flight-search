import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { Search } from '../search/Search';

jest.mock('../../services/flightService', () => ({
  fetchFlightsData: jest.fn().mockImplementation(() => [{}, {}]),
  getFilteredFlights: jest.fn().mockImplementation(() => [{ name: 'Multiple' }, {}])
}));
afterAll(() => {
  jest.unmock('../../services/flightService');
});
describe('App', () => {
  it('should render', () => {
    const app = mount(<App></App>);
    expect(app).toBeDefined();
  });

  it('should set search data and flights Data on submit call', async () => {
    const setSearchData = jest.fn();
    const useState = jest
      .spyOn(React, 'useState')
      .mockImplementation(init => [init, setSearchData]);

    const app = shallow(<App></App>);
    const searchEle = app.find(Search);
    const onSubmit = searchEle.prop('onSubmit');
    onSubmit({});
    expect(setSearchData).toBeCalledWith({});
    useState.mockRestore();
  });

  it('should get return flights', async () => {
    const setReturnFlights = jest.fn();
    const useState = jest
      .spyOn(React, 'useState')
      .mockImplementation(init => [init, setReturnFlights]);
    const useEffect = jest.spyOn(React, 'useEffect').mockImplementation(() => {});
    const app = shallow(<App></App>);
    const searchEle = app.find(Search);
    const onSubmit = searchEle.prop('onSubmit');
    onSubmit({ selectedTab: 'return' });
    expect(setReturnFlights).toBeCalledTimes(1);
    useState.mockRestore();
  });
});
