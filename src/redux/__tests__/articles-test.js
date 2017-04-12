// import articlesReducer from 'redux/modules/articlesModule';
// import { expect } from 'chai';

// describe('articlesReducer', () => {
//   const initialState = {
//     // Loading all articles
//     all: [],
//     loadingArticles: false,
//     articlesLoaded: false,
//     loadArticlesError: '',
//     // Adding new article
//     addingArticle: false,
//     articleAdded: null, // (Number) ID of an article that was just added
//     addArticleError: '',
//     // Editing article
//     editingArticle: false,
//     articleEdited: false,
//     editArticleError: '',
//     // Removing a article
//     removingArticle: null, // (Number) ID of an article being removed
//     articleRemoved: false,
//     removeArticleError: ''
//   }

//   const mockMessages = {
//     message: [ { id: 29,
//       title: 'Lorem dolor',
//       content: '"{\\"document\\":{\\"data\\":{},\\"kind\\":\\"document\\",\\"nodes\\":[{\\"data\\":{},\\"kind\\":\\"block\\",\\"isVoid\\":false,\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"kind\\":\\"range\\",\\"text\\":\\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas pellentesque tellus. Phasellus vitae urna sit amet purus fermentum consectetur. Vestibulum sed dapibus metus. Etiam commodo pulvinar porttitor. Proin ac dui justo. In lacus ex, varius vitae erat in, ullamcorper hendrerit dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\\",\\"marks\\":[]}]}]}]},\\"kind\\":\\"state\\"}"',
//       createdAt: '2017-03-31T15:54:06.801Z',
//       updatedAt: '2017-04-05T19:17:40.671Z' },
//       { id: 23,
//       title: 'Test article',
//       content: '"{\\"document\\":{\\"data\\":{},\\"kind\\":\\"document\\",\\"nodes\\":[{\\"data\\":{},\\"kind\\":\\"block\\",\\"isVoid\\":false,\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"kind\\":\\"range\\",\\"text\\":\\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas pellentesque tellus. Phasellus vitae urna sit amet purus fermentum consectetur. Vestibulum sed dapibus metus. Etiam commodo pulvinar porttitor. Proin ac dui justo. In lacus ex, varius vitae erat in, ullamcorper hendrerit dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\\",\\"marks\\":[]}]}]}]},\\"kind\\":\\"state\\"}"',
//       createdAt: '2017-03-30T15:29:22.612Z',
//       updatedAt: '2017-04-05T19:17:51.893Z' },
//       { id: 26,
//       title: 'Lorem ipsum',
//       content: '"{\\"document\\":{\\"data\\":{},\\"kind\\":\\"document\\",\\"nodes\\":[{\\"data\\":{},\\"kind\\":\\"block\\",\\"isVoid\\":false,\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"kind\\":\\"range\\",\\"text\\":\\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas pellentesque tellus. Phasellus vitae urna sit amet purus fermentum consectetur. Vestibulum sed dapibus metus. Etiam commodo pulvinar porttitor. Proin ac dui justo. In lacus ex, varius vitae erat in, ullamcorper hendrerit dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\\",\\"marks\\":[]}]}]}]},\\"kind\\":\\"state\\"}"',
//       createdAt: '2017-03-31T08:58:50.830Z',
//       updatedAt: '2017-04-05T19:56:00.137Z' },
//       { id: 30,
//       title: 'updated test title',
//       content: '"{\\"document\\":{\\"data\\":{},\\"kind\\":\\"document\\",\\"nodes\\":[{\\"data\\":{},\\"kind\\":\\"block\\",\\"isVoid\\":false,\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"kind\\":\\"range\\",\\"text\\":\\"updated test content 123\\",\\"marks\\":[]}]}]}]},\\"kind\\":\\"state\\"}"',
//       createdAt: '2017-04-05T12:22:46.389Z',
//       updatedAt: '2017-04-05T20:19:18.979Z' },
//       { id: 31,
//       title: 'Test 1',
//       content: '"{\\"nodes\\":[{\\"kind\\":\\"block\\",\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"text\\":\\"Content...\\"}]}]}]}"',
//       createdAt: '2017-04-06T14:05:44.482Z',
//       updatedAt: '2017-04-06T14:05:44.482Z' },
//       { id: 32,
//       title: 'Test 2',
//       content: '"{\\"nodes\\":[{\\"kind\\":\\"block\\",\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"text\\":\\"Content...\\"}]}]}]}"',
//       createdAt: '2017-04-06T14:06:03.450Z',
//       updatedAt: '2017-04-06T14:06:03.450Z' },
//       { id: 33,
//       title: 'Test 3',
//       content: '"{\\"nodes\\":[{\\"kind\\":\\"block\\",\\"type\\":\\"paragraph\\",\\"nodes\\":[{\\"kind\\":\\"text\\",\\"ranges\\":[{\\"text\\":\\"Content...\\"}]}]}]}"',
//       createdAt: '2017-04-06T14:06:19.233Z',
//       updatedAt: '2017-04-06T14:06:19.233Z' }
//     ]
//   }
//   // it('should return initial state', () => {
//   //   expect(
//   //     articlesReducer(undefined, {})
//   //   ).to.equal(
//   //   {
//   //     // Loading all articles
//   //     all: [],
//   //     loadingArticles: false,
//   //     articlesLoaded: false,
//   //     loadArticlesError: '',
//   //     // Adding new article
//   //     addingArticle: false,
//   //     articleAdded: null, // (Number) ID of an article that was just added
//   //     addArticleError: '',
//   //     // Editing article
//   //     editingArticle: false,
//   //     articleEdited: false,
//   //     editArticleError: '',
//   //     // Removing a article
//   //     removingArticle: null, // (Number) ID of an article being removed
//   //     articleRemoved: false,
//   //     removeArticleError: ''
//   //   }
//   //   )
//   // })

//   it('should handle LOAD_ARTICLES_REQUEST', () => {
//     const result = articlesReducer(initialState, { type: 'LOAD_ARTICLES_REQUEST'})
//     expect(result.articlesLoaded).to.equal(false)
//     expect(result.loadingArticles).to.equal(true)
//     expect(result.loadArticlesError).to.equal(null)
//   })

//   it('should handle LOAD_ARTICLES_SUCCESS', () => {
//     const result = articlesReducer(initialState, { type: 'LOAD_ARTICLES_SUCCESS', result: mockMessages })
//     expect(result.all.length).to.equal(7)
//     expect(result.loadingArticles).to.equal(false)
//     expect(result.articlesLoaded).to.equal(true)
//   })

//   it('should handle LOAD_ARTICLES_FAIL', () => {
//     const result = articlesReducer(initialState, { type: 'LOAD_ARTICLES_FAIL', error: { message: `test error` } })
//     expect(result.loadingArticles).to.equal(false)
//     expect(result.articlesLoaded).to.equal(false)
//     expect(result.loadArticlesError).to.equal(`Error while loading articles: test error`)
//   })
// })