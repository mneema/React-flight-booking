import React from 'react';
import ReactDOM from 'react-dom';

import FlightsGrid from './flights-grid';
import { mount } from 'enzyme';
import mockFlights from './flights-mock.json';

const criteria = {
  date: "2020-11-02",
  destination: "Delhi (DEL)",
  origin: "Mumbai (BOM)"
}

describe('Flight results component', () => {
  let wrapper;

  it('should render without crashing', () => {
    const div = document.createElement('div');
    wrapper = ReactDOM.render(<FlightsGrid/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render search criteria info at the top', () => {
    wrapper = mount(<FlightsGrid flights={mockFlights} criteria={criteria} />);
    expect(wrapper.find(".flight-search-info h3").text()).toBe(`${criteria.origin} to ${criteria.destination}`);
    wrapper.unmount();
  });

  it('should render result count and selected date', () => {
    const count = mockFlights.nonStopFlights.length + mockFlights.multiStopFlights.length;
    wrapper = mount(<FlightsGrid flights={mockFlights} criteria={criteria} />);
    expect(wrapper.find(".flight-search-info p").text()).toBe(`${count} flights found, ${criteria.date}`);
    wrapper.unmount();
  });

  it('should render all flights info cards', () => {
    const count = mockFlights.nonStopFlights.length + mockFlights.multiStopFlights.length;
    wrapper = mount(<FlightsGrid flights={mockFlights} criteria={criteria} />);
    expect(wrapper.find(".flights-info-container .card").length).toBe(count);
    wrapper.unmount();
  });

})


