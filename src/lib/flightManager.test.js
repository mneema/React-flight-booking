import { findPaths } from './flightManager';
import mockFlights from './../data.json';
import { mount, shallow } from 'enzyme';

const flight = {
  "arrivalTime": "16:30",
  "date": "2020/11/02",
  "departureTime": "14:30",
  "destination": "Delhi (DEL)",
  "flightNo": "AI-132",
  "name": "Air India",
  "origin": "Mumbai (BOM)",
  "price": 4170,
  "arrivalTimeStamp": 1604314800000,
  "departureTimeStamp": 1604307600000
}

describe('Flights calculation algorithm', () => {

  it('should find available direct flights from Pune to Delhi ', () => {
    const criteria = {
      date: "2020-11-01",
      destination: "Delhi (DEL)",
      origin: "Pune (PNQ)"
    }
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.length).toBe(1);
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights[0].flightNo).toBe('AI-104');
  });

  it('should find available direct flights from Mumbai to Delhi ', () => {
    const criteria = {
      date: "2020-11-01",
      destination: "Delhi (DEL)",
      origin: "Mumbai (BOM)"
    }
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.length).toBe(2);
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.find(flight=>flight.flightNo === 'AI-110').flightNo).toBe('AI-110');
  });

  it('should find available direct flights from Delhi to Pune ', () => {
    const criteria = {
      date: "2020-11-02",
      destination: "Pune (PNQ)",
      origin: "Delhi (DEL)"
    }
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.length).toBe(1);
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.find(flight=>flight.flightNo === 'AI-131').flightNo).toBe('AI-131');
  }); 
  
  it('should find available direct flights from Delhi to Mumbai', () => {
    const criteria = {
      date: "2020-11-02",
      destination: "Mumbai (BOM)",
      origin: "Delhi (DEL)"
    }
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.length).toBe(2);
    expect(findPaths({flights: mockFlights, criteria }).nonStopFlights.find(flight=>flight.flightNo === 'AI-130').flightNo).toBe('AI-130');
  });

  it('should find available multi airline flights from Pune to Delhi ', () => {
    const criteria = {
      date: "2020-11-01",
      destination: "Delhi (DEL)",
      origin: "Pune (PNQ)"
    }
    const searchFn = (route) => {
      return route.flights.find(flight => flight.flightNo === 'AI-101') && route.flights.find(flight => flight.flightNo === 'AI-102');
    }

    expect(findPaths({flights: mockFlights, criteria }).multiStopFlights.findIndex(searchFn) >=0).toBe(true);
  });

  it('should find available multi airline flights from Mumbai to Delhi ', () => {
    const criteria = {
      date: "2020-11-01",
      destination: "Delhi (DEL)",
      origin: "Mumbai (BOM)"
    }
    const searchFn = (route) => {
      return route.flights.find(flight => flight.flightNo === 'TW-108') && route.flights.find(flight => flight.flightNo === 'TW-109');
    }

    expect(findPaths({flights: mockFlights, criteria }).multiStopFlights.findIndex(searchFn) >=0).toBe(true);
  });

  it('should find available multi airline flights from Delhi to Pune ', () => {
    const criteria = {
      date: "2020-11-02",
      destination: "Pune (PNQ)",
      origin: "Delhi (DEL)"
    }
    const searchFn = (route) => {
      return route.flights.find(flight => flight.flightNo === 'AI-119') && route.flights.find(flight => flight.flightNo === 'AI-120');
    }

    expect(findPaths({flights: mockFlights, criteria }).multiStopFlights.findIndex(searchFn) >=0).toBe(true);
  });

  it('should find available multi airline flights from Delhi to Mumbai ', () => {
    const criteria = {
      date: "2020-11-02",
      destination: "Mumbai (BOM)",
      origin: "Delhi (DEL)"
    }
    const searchFn = (route) => {
      return route.flights.find(flight => flight.flightNo === 'TW-118') && route.flights.find(flight => flight.flightNo === 'TW-119');
    }

    expect(findPaths({flights: mockFlights, criteria }).multiStopFlights.findIndex(searchFn) >=0).toBe(true);
  });
})


