import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument} from 'react-dom/test-utils';
import { expect} from 'chai';
import Login from 'containers/Login/Login';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('Login (auth)', () => {
  const mockStore = {
    auth: {
      user: { name: 'qweqweqwe' },
      login: () => {},
      logout: () => {},
    }
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Login />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with info about auth status', () => {
    const text = dom.getElementsByTagName('p')[0].textContent;
    expect(text).to.equal(`You are currently logged in as ${mockStore.auth.user.name}.`)
  });

  it('should render with a log out button', () => {
    const text = dom.getElementsByTagName('button')[0].textContent;
    expect(text).to.equal(' Log Out');
  });
});