import { getDiffInHours, getDiffInMinutes, isDateEqual } from './utils';

export const fetchFlightsData = async () => {
  const response = await fetch('https://tw-frontenders.firebaseio.com/advFlightSearch.json');
  return await response.json();
};
export const getMultipleFlights = ({ data, originCity, destinationCity, passengers }) => {
  const nonDirectFlights =
    data &&
    data.filter(flight => {
      return (
        !(flight.origin === originCity && flight.destination === destinationCity) &&
        (flight.destination === destinationCity || flight.origin === originCity)
      );
    });

  let finalData = [];
  nonDirectFlights &&
    nonDirectFlights.map(data => {
      if (data.origin === originCity) {
        const matchedFlight = nonDirectFlights.find(
          flight =>
            flight.origin === data.destination &&
            flight.destination === destinationCity &&
            flight.name === data.name &&
            getDiffInMinutes(flight.departureTime, data.arrivalTime) > 30
        );

        if (matchedFlight) {
          data.travelTime = getDiffInHours(data.arrivalTime, data.departureTime);
          matchedFlight.travelTime = getDiffInHours(
            matchedFlight.arrivalTime,
            matchedFlight.departureTime
          );
          finalData.push({
            name: 'Multiple',
            departureTime: data.departureTime,
            origin: data.origin,
            arrivalTime: matchedFlight.arrivalTime,
            destination: matchedFlight.destination,
            price: passengers * (data.price + matchedFlight.price),
            details: [data, matchedFlight],
            travelTime: getDiffInHours(matchedFlight.arrivalTime, data.departureTime),
            layOverTime: getDiffInHours(matchedFlight.departureTime, data.arrivalTime)
          });
        }
      }
    });
  return finalData;
};

export const getFilteredFlights = ({
  data,
  travelDate,
  originCity,
  destinationCity,
  passengers
}) => {
  const selectedDateFlights =
    data &&
    data.filter(flight => {
      return isDateEqual(flight.date, travelDate);
    });
  let directFlights =
    selectedDateFlights &&
    selectedDateFlights
      .filter(flight => {
        return flight.origin === originCity && flight.destination === destinationCity;
      })
      .map(f => {
        f.travelTime = getDiffInHours(f.arrivalTime, f.departureTime);
        f.price = f.price * passengers;
        return f;
      });
  let multipleFlights = getMultipleFlights({
    data: selectedDateFlights,
    originCity,
    destinationCity,
    passengers
  });
  directFlights = directFlights ? directFlights : [];
  return [...directFlights, ...multipleFlights];
};
