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
      user: { name: 'qweqweqwe' },
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

  it('should render with info about auth status', () => {
    expect(renderer.find('p')).to.have.length(1);
    expect(renderer.find('p')).to.have.text(`You are currently logged in as ${mockStore.auth.user.name}.`)
  });

  it('should render with a log out button', () => {
    expect(renderer.find('button')).to.have.length(1);
    expect(renderer.find('button')).to.have.text().match(/ Log Out/);
  });
});