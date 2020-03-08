import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount, shallow, render } from 'enzyme';

const initialState = {}; 
// here it is possible to pass in any middleware if needed into //configureStore
const mockStore = configureStore();
let store;
describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    store = mockStore(initialState);
  })
  
  it('should render without crashing', () => {
    const div = document.createElement('div');
    wrapper = ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have a header', () => {
    wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find("header.App-header").length).toBe(1);
    wrapper.unmount();
  });

  it('should have a search form', () => {
    wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find("form.search-form-container").length).toBe(1);
  });

  it('should not have any flight results initially', () => {
    wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find("flights-info-container").length).toBe(0);
  });
})


