import React from 'react';
import ReactDOM from 'react-dom';

import { FlightInfo } from './flight-info';
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

describe('Flight results component', () => {
  let wrapper;

  it('should render without crashing', () => {
    const div = document.createElement('div');
    wrapper = ReactDOM.render(<FlightInfo  data={flight} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render non-stop flight logo', () => {
    wrapper = shallow(<FlightInfo data={flight} />);
    expect(wrapper.find("FlightLogo").length).toBe(1);
    wrapper.unmount();
  });

  it('should render a button for booking', () => {
    wrapper = mount(<FlightInfo data={flight} />);
    expect(wrapper.find("button").text()).toBe('Book');
    wrapper.unmount();
  });

  it('should render flight details', () => {
    wrapper = mount(<FlightInfo data={flight} />);
    expect(wrapper.find(".detail-label h4").at(0).text()).toBe('Air India');
    expect(wrapper.find(".detail-label p").at(0).text()).toBe('AI-132');
    wrapper.unmount();
  });

  it('should show flight duration', () => {
    wrapper = mount(<FlightInfo data={flight} />);
    expect(wrapper.find(".detail-label h4").at(3).text()).toBe('2h 0m');
    expect(wrapper.find(".detail-label p").at(3).text()).toBe('Non stop');
    wrapper.unmount();
  });


})


