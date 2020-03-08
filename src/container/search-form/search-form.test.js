import React from 'react';
import ReactDOM from 'react-dom';

import { SearchForm } from './search-form';
import { mount } from 'enzyme';

describe('Search Form component', () => {
  let wrapper;
  beforeEach(() => {
    //creates the store with any initial state or middleware needed  
    //store = mockStore(initialState);
  })
  
  it('should render without crashing', () => {
    const div = document.createElement('div');
    wrapper = ReactDOM.render(<SearchForm/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have a form', () => {
    wrapper = mount(<SearchForm/>);
    expect(wrapper.find("form").length).toBe(1);
    wrapper.unmount();
  });

  it('should have selection for one way or return flight', () => {
    wrapper = mount(<SearchForm/>);
    expect(wrapper.find("input[type='radio']").length).toBe(2);
    wrapper.unmount();
  });

  it('should have inputs for origin and destination', () => {
    wrapper = mount(<SearchForm/>);
    expect(wrapper.find("input[placeholder='Enter Origin']").length).toBe(1);
    expect(wrapper.find("input[placeholder='Enter Destination']").length).toBe(1);
    wrapper.unmount();
  });

  it('should have date input for departure date', () => {
    wrapper = mount(<SearchForm/>);
    expect(wrapper.find("input[type='date']").length).toBe(1);
    wrapper.unmount();
  });


  it('should have selection for number of passengers', () => {
    wrapper = mount(<SearchForm/>);
    expect(wrapper.find("select").length).toBe(1);
    wrapper.unmount();
  });

  it('should show return date input when return flight is selected', () => {
    wrapper = mount(<SearchForm/>);
    wrapper.find("input[type='radio']").at(1).simulate('change');
    expect(wrapper.find("input[name='dateOfReturn']").length).toBe(1);
    wrapper.unmount();
  });

})


