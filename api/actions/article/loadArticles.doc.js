/**
  @api {GET} /api/article/loadArticles/ Load article list
  @apiDescription Fetch all articles from the database
  @apiName Fetch articles
  @apiGroup Article

  @apiExample Example request:
  GET /api/article/loadArticles HTTP/1.1

  @apiSuccessExample Example data on success:
  {
    "message": [
      {
        "id": 26,
        "title": "Lorem ipsum",
        "content": "\"{\\\"document\\\":{\\\"data\\\":{},\\\"kind\\\":\\\"document\\\",\\\"nodes\\\":[{\\\"data\\\":{},\\\"kind\\\":\\\"block\\\",\\\"isVoid\\\":false,\\\"type\\\":\\\"paragraph\\\",\\\"nodes\\\":[{\\\"kind\\\":\\\"text\\\",\\\"ranges\\\":[{\\\"kind\\\":\\\"range\\\",\\\"text\\\":\\\"Ea tempor eiusmod occaecat consequat mollit aute magna enim duis commodo. Non in esse ipsum nostrud eu ex dolore commodo aliquip excepteur adipisicing. Voluptate est proident in exercitation incididunt eu dolor sit.\\\",\\\"marks\\\":[]}]}]}]},\\\"kind\\\":\\\"state\\\"}\"",
        "createdAt": "2017-03-31T08:58:50.830Z",
        "updatedAt": "2017-03-31T16:26:05.322Z",
        "plainText": 'Ea tempor eiusmod occaecat consequat mollit aute magna enim duis commodo. Non in esse ipsum nostrud eu ex dolore commodo aliquip excepteur adipisicing. Voluptate est proident in exercitation incididunt eu dolor sit.'
      },
      {
        "id": 29,
        ...
      },
      ...
    ],
    "type": "success"
  }
 */

 /**
   @api {GET} /api/article/loadArticles/:id Load selected article
   @apiDescription Fetch current article from the database
   @apiName Fetch selected article
   @apiGroup Article

   @apiExample Example request:
   GET /api/article/loadArticles/:id/ HTTP/1.1

   @apiParam {String} id Article unique id.

   @apiSuccessExample Example data on success:
   {
      "message": {
        "id": 30,
        "title": "updated test title",
        "content": "{\"document\":{\"data... }",
        "previewSize": [
          "123",
          "32"
        ],
        "plainText": "Lorem... ol3\nfinish value",
        "createdAt": "2017-04-05T12:22:46.389Z",
        "updatedAt": "2017-04-10T13:59:19.747Z"
      },
      "type": "success"
    }
  */

  /**
    @api {GET} /api/article/loadArticles/ Filter articles
    @apiDescription Fetch filtered articles from the database
    @apiName Filter article
    @apiGroup Article

    @apiExample Example request:
    GET /api/article/loadArticles?content=olo HTTP/1.1

    @apiParam {String} [title] Find article which contains current title.
    @apiParam {String} [content] Find article which contains current content.

   */
