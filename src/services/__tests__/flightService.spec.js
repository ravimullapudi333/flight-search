import { fetchFlightsData, getMultipleFlights, getFilteredFlights } from '../flightService';

describe('flightService', () => {
  describe('fetchFlightsData', () => {
    it('should fetch flight details', async () => {
      const fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({})
        })
      );
      const backupFetch = global.fetch;
      global.fetch = fetch;
      const details = fetchFlightsData();
      expect(details).toBeDefined();
      fetch.mockClear();
      global.fetch = backupFetch;
    });
  });

  describe('getMultipleFlights', () => {
    it('should return empty data if flights data is not defined', () => {
      const multipleFlights = getMultipleFlights({
        data: undefined,
        originCity: '',
        destinationCity: '',
        passengers: 1
      });
      expect(multipleFlights.length).toBe(0);
    });

    it('should return multiple flights data', () => {
      const data = [
        {
          arrivalTime: '6:00',
          date: '2020/11/01',
          departureTime: '5:00',
          destination: 'Mumbai (BOM)',
          flightNo: 'AI-101',
          name: 'Air India',
          origin: 'Pune (PNQ)',
          price: 3525
        },
        {
          arrivalTime: '9:50',
          date: '2020/11/01',
          departureTime: '7:20',
          destination: 'Delhi (DEL)',
          flightNo: 'AI-102',
          name: 'Air India',
          origin: 'Mumbai (BOM)',
          price: 5635
        }
      ];
      const multipleFlights = getMultipleFlights({
        data,
        originCity: 'Pune (PNQ)',
        destinationCity: 'Delhi (DEL)',
        passengers: 1
      });
      expect(multipleFlights.length).toBe(1);
    });
  });

  describe('getFilteredFlights', () => {
    it('should return empty data if flights data is not defined', () => {
      const filteredFlights = getFilteredFlights({
        data: undefined,
        travelDate: '',
        originCity: '',
        destinationCity: '',
        passengers: 1
      });
      expect(filteredFlights.length).toBe(0);
    });
    it('should return flights data with multiple and direct flights', () => {
      const data = [
        {
          arrivalTime: '6:00',
          date: '2020/11/01',
          departureTime: '5:00',
          destination: 'Mumbai (BOM)',
          flightNo: 'AI-101',
          name: 'Air India',
          origin: 'Pune (PNQ)',
          price: 3525
        },
        {
          arrivalTime: '9:50',
          date: '2020/11/01',
          departureTime: '7:20',
          destination: 'Delhi (DEL)',
          flightNo: 'AI-102',
          name: 'Air India',
          origin: 'Mumbai (BOM)',
          price: 5635
        },
        {
          arrivalTime: '10:20',
          date: '2020/11/01',
          departureTime: '8:10',
          destination: 'Delhi (DEL)',
          flightNo: 'AI-104',
          name: 'Air India',
          origin: 'Pune (PNQ)',
          price: 4681
        }
      ];
      const filteredFlights = getFilteredFlights({
        data,
        travelDate: '2020-11-01',
        originCity: 'Pune (PNQ)',
        destinationCity: 'Delhi (DEL)',
        passengers: 1
      });
      expect(filteredFlights.length).toBe(2);
    });
  });
});
