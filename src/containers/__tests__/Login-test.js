import React from 'react';
import Login from 'containers/Login/Login';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
import { shallow, render, mount } from 'enzyme';
const client = new ApiClient();

describe('Login', () => {
  const mockStore = {
    auth: {
      login: () => {},
      logout: () => {},
    }
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = mount(
    <Provider store={store} key="provider">
      <Login />
    </Provider>
  );

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render an input to log in`', () => {
    expect(renderer.find('input')).to.have.length(1);
  });

  it('should render an button to log in`', () => {
    expect(renderer.find('button')).to.have.length(1);
    expect(renderer.find('button')).to.have.text().match(/ Log In/);
  });
});