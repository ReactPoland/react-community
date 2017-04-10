import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument } from 'react-dom/test-utils';
import { expect } from 'chai';
import Home from 'containers/Home/Home';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import createStore from 'redux/create';
import ApiClient from 'helpers/ApiClient';
const client = new ApiClient();

describe('Home', () => {
  const mockStore = {
    auth: {
      login: () => {},
      logout: () => {},
    }
  };
  const store = createStore(browserHistory, client, mockStore);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Home />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with img', () => {
    const element = dom.getElementsByTagName('img')[0];
    expect(element).to.exist
  });  

  it('should render with h1', () => {
    const element = dom.getElementsByTagName('h1')[0];
    expect(element).to.exist
    expect(element.textContent).to.equal('React Community')
  });

  it('should render with h2', () => {
    const element = dom.getElementsByTagName('h2')[0];
    expect(element).to.exist
    expect(element.textContent).to.equal('All the modern best practices in one example.')
  });
});