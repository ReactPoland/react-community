import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';
import Login from 'containers/Login/Login';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('Login', () => {
  const mockStore = {
    auth: {
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

  it('should render with input', () => {
    const input = dom.getElementsByTagName('input')[0];
    expect(input).to.exist
  });

  it('should render with a log in button', () => {
    const text = dom.getElementsByTagName('button')[0].textContent;
    expect(text).to.equal(' Log In');
  });
});