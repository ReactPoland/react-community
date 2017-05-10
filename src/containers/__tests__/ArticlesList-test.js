import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument } from 'react-dom/test-utils'
import { expect } from 'chai'
import ArticlesList from 'containers/Articles/ArticlesPage/ArticlesList'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import createStore from 'redux/create'
import ApiClient from 'helpers/ApiClient'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../theme/materialUiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

const client = new ApiClient()
injectTapEventPlugin()

describe('ArticlesList', () => {
  const mockStore = {
    articles: [
      {
        content: `"{"document":{"data":{},"kind":"document","nodes":[{"data":{},"kind":"block","isVoid":false,"type":"paragraph","nodes":[{"kind":"text","ranges":[{"kind":"range","text":"In quis magna tempor ex maximus dignissim. Maecenas vitae sodales ante. Nullam sem erat, faucibus laoreet iaculis blandit, ultricies non tortor. Ut sollicitudin orci sed lectus congue, sit amet rhoncus urna fringilla. Nulla a tempus ante. Pellentesque euismod metus libero, sed tristique ex euismod eu. Nullam nec gravida urna, id molestie risus. In at aliquam risus. Vestibulum id ipsum eget sapien dictum ultricies. Ut commodo magna augue, id fringilla lectus sodales eu. Proin ac libero facilisis, placerat lacus et, venenatis ipsum.","marks":[]}]}]}]},"kind":"state"}"`,
        createdAt: "2017-03-31T15:54:06.801Z",
        id: 29,
        title: `Lorem ipsum`,
        updatedAt: "2017-03-31T16:26:22.436Z"
      },
      {
        content: `"{"document":{"data":{},"kind":"document","nodes":[{"data":{},"kind":"block","isVoid":false,"type":"paragraph","nodes":[{"kind":"text","ranges":[{"kind":"range","text":"In quis magna tempor ex maximus dignissim. Maecenas vitae sodales ante. Nullam sem erat, faucibus laoreet iaculis blandit, ultricies non tortor. Ut sollicitudin orci sed lectus congue, sit amet rhoncus urna fringilla. Nulla a tempus ante. Pellentesque euismod metus libero, sed tristique ex euismod eu. Nullam nec gravida urna, id molestie risus. In at aliquam risus. Vestibulum id ipsum eget sapien dictum ultricies. Ut commodo magna augue, id fringilla lectus sodales eu. Proin ac libero facilisis, placerat lacus et, venenatis ipsum.","marks":[]}]}]}]},"kind":"state"}"`,
        createdAt: "2017-03-31T15:54:06.801Z",
        id: 30,
        title: `Dolor sit amet`,
        updatedAt: "2017-03-31T16:26:22.436Z"
      },
      {
        content: `"{"document":{"data":{},"kind":"document","nodes":[{"data":{},"kind":"block","isVoid":false,"type":"paragraph","nodes":[{"kind":"text","ranges":[{"kind":"range","text":"In quis magna tempor ex maximus dignissim. Maecenas vitae sodales ante. Nullam sem erat, faucibus laoreet iaculis blandit, ultricies non tortor. Ut sollicitudin orci sed lectus congue, sit amet rhoncus urna fringilla. Nulla a tempus ante. Pellentesque euismod metus libero, sed tristique ex euismod eu. Nullam nec gravida urna, id molestie risus. In at aliquam risus. Vestibulum id ipsum eget sapien dictum ultricies. Ut commodo magna augue, id fringilla lectus sodales eu. Proin ac libero facilisis, placerat lacus et, venenatis ipsum.","marks":[]}]}]}]},"kind":"state"}"`,
        createdAt: "2017-03-31T15:54:06.801Z",
        id: 31,
        title: `Test`,
        updatedAt: "2017-03-31T16:26:22.436Z"
      }
    ]
  }
  const store = createStore(browserHistory, client, mockStore)
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <MuiThemeProvider muiTheme={muiTheme}>
        <ArticlesList onListItemClick={() => {}} articles={mockStore.articles} />
      </MuiThemeProvider>
    </Provider>
  )
  const dom = ReactDOM.findDOMNode(renderer)

  it('should render correctly', () => {
    return expect(renderer).to.be.ok
  })

  it('should render 3 spans with articles', () => {
    const element = dom.getElementsByTagName('span');
    expect(element.length).to.equal(3)
  });

})