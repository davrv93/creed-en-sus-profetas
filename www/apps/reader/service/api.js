app.factory('API_READER', function ($resource) {

  var url = "http://davrv93.pythonanywhere.com/api/believe/";
  // var url = "http://localhost:8000/api/believe/";

  return {
    Book: $resource(url + 'book/:id/:micro/', {
      'id': '@id',
      'micro': '@micro'
    }, {
      'list': {
        method: 'GET',
        isArray: true
      },
      "save": {
        method: 'POST'
      },
      "update": {
        method: 'PUT'
      },
      'get': {
        method: 'GET',
        isArray: true
      },
      'post': {
        method: 'GET'
      },
      'destroy': {
        method: 'POST'
      }
    }),
    BookLanguages: $resource(url + 'book_languages/:id/:micro/', {
      'id': '@id',
      'micro': '@micro'
    }, {
      'get': {
        method: 'GET'
      }
    }),
    BibleReading: $resource(url + 'bible_reading/:id/:micro/', {
      'id': '@id',
      'micro': '@micro'
    }, {
      'get': {
        method: 'GET',
        isArray: false
      },
      'getList': {
        method: 'GET',
        isArray: true
      },
      'post': {
        method: 'POST',
        isArray: false
      }
    }),
    Testament: $resource(url + 'testament/:id/:micro/', {
      'id': '@id',
      'micro': '@micro'
    }, {
      'list': {
        method: 'GET',
        isArray: true
      },
      "save": {
        method: 'POST'
      },
      "update": {
        method: 'PUT'
      },
      'get': {
        method: 'GET',
        isArray: true
      },
      'post': {
        method: 'GET'
      },
      'destroy': {
        method: 'POST'
      }
    }),
    Sucursal: $resource(url + 'sucursales/:id/:micro/', {
      'id': '@id',
      'micro': '@micro'
    }, {
      'get': {
        method: 'GET',
        isArray: true
      },
    }),

    Verse: $resource(url + 'verses/:id/:micro/', {
      'id': '@id',
      'micro': '@micro'
    }, {
      'get': {
        method: 'GET'
      },

    }),
  };
});
