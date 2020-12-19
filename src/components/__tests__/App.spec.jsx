import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { Search } from '../search/Search';

describe('App', () => {
  it('should render', () => {
    const app = mount(<App></App>);
    expect(app).toBeDefined();
  });

  it.only('should set search data and fetch flights Data', () => {
    const setSearchData = jest.fn();
    const setFlightsData = jest.fn();
    const useState = jest.spyOn(React, 'useState').mockImplementation(() => {
      return [false, setSearchData];
    });
    const useState1 = jest.spyOn(React, 'useState').mockImplementation(() => {
      return [false, setFlightsData];
    });
    const app = shallow(<App></App>);
    const searchEle = app.find(Search);
    console.log('search ele ====>', searchEle.debug());
    searchEle.simulate('onSubmit', { originCity: 'test' });
    expect(setSearchData).toBeCalledWith({ originCity: 'test' });
    useState.mockRestore();
  });
});
