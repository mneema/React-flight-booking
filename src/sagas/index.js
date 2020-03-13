import { put, takeLatest, all } from 'redux-saga/effects';
import { findPaths } from './../lib/flightManager';
import { transformFlightDates } from './../lib/utils';

function* fetchFlights() {
  try {
    const json = yield fetch('https://my-json-server.typicode.com/mneema/mock-db/flights')
      .then(response => response.json());
    yield put({ type: "GET_FLIGHTS_SUCCESS", json: transformFlightDates(json) });
  } catch (e) {
    console.log('error', e);
    yield put({ type: "GET_FLIGHTS_FAIL", error: e });
  }

}

function* findFlights(payload) {
  try {
    yield put({ type: "GET_FILTERS_SUCCESS", json: payload.payload.criteria });
    
    const { flights, criteria: { returnDate, origin, destination, departureDate, numOfPassengers } } = payload.payload;
    const listOfFlights = {};
    
    if (returnDate) {
      listOfFlights.return = findPaths({ flights, criteria: { origin: destination, destination: origin, date: returnDate, numOfPassengers } })
    }

    listOfFlights.onwards = findPaths({ flights, criteria: { origin, destination, date: departureDate, numOfPassengers } });
    
    yield put({ type: "GET_ROUTES_SUCCESS", json: listOfFlights });
  } catch (e) {
    console.log('error', e);
    yield put({ type: "GET_ROUTES_FAIL", error: e });
  }

}

function* flightsWatcher() {
  yield takeLatest('GET_FLIGHTS', fetchFlights)
}

function* findFlightsWatcher() {
  yield takeLatest('GET_ROUTES', findFlights)
}

export default function* rootSaga() {
  yield all([
    flightsWatcher(),
    findFlightsWatcher()
  ]);
}
