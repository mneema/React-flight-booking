import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import SearchForm from './container/search-form/search-form';
import FlightsGrid from './components/flights-grid/flights-grid';
import { getFlights } from './actions';

function App(props) {
  useEffect(() => {
    props.getFlights()
  }, [(props.flights || []).legnth]);

  const { origin, destination, departureDate, returnDate } = props.filters || {};
  return (
    <div className="App">
      <header className="App-header">
        <h2>Flight Search App</h2>
      </header>
      <section className="Main-container">
        <aside className="Search-section">
          <SearchForm></SearchForm>
        </aside>
        <section className="Results-section">
          { props.routes && props.routes.onwards && <FlightsGrid 
            flights={ props.routes.onwards} 
            criteria={{origin, destination, date: departureDate}}
          ></FlightsGrid> }
          {props.routes && props.routes.return && <FlightsGrid 
            flights={ props.routes.return}
            criteria={{origin: destination, destination: origin, date: returnDate}}
          ></FlightsGrid>}
        </section>
      </section>
            
    </div>
  );
}

const mapStateToProps = (state) => ({
  flights: state.flights,
  routes: state.routes,
  filters: state.filters
})

const mapDispatchToProps = {
  getFlights
}


export default connect(mapStateToProps, mapDispatchToProps)(App)

