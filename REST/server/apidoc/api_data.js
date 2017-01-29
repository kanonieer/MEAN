define({ "api": [
  {
    "type": "delete",
    "url": "/movies/:id",
    "title": "Delete Movie from database",
    "name": "DeleteMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Movie unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MovieNotFound",
            "description": "<p>The id of the Movie was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no Movie with this ID\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "/movies/:id",
    "title": "Request Movie information",
    "name": "GetMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Movie unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>Category of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fee",
            "description": "<p>Cost of the Movie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"Star Trek\",\n  \"categoryIds\": [\"sciFi\", \"adventure\"],\n  \"count\": 3,\n   \"fee\": 5.99\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MovieNotFound",
            "description": "<p>The id of the Movie was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no Movie with this ID\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "/movies",
    "title": "Request all Movies",
    "name": "GetMovies",
    "group": "Movies",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Movie[]",
            "optional": false,
            "field": "movies",
            "description": "<p>all movies.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n   {\n     \"name\": \"Dark Tower\",\n     \"categoryIds\": [\"adventure\", \"fantasy\"],\n     \"count\": 1,\n     \"fee\": 8.99\n   },\n   {\n      \"name\": \"Twilight\",\n      \"categoryIds\": [\"fantasy\", \"comedy\"],\n      \"count\": 3,\n      \"fee\": 5.99\n   },\n   {\n     \"name\": \"Star Trek\",\n     \"categoryIds\": [\"sciFi\", \"adventure\"],\n     \"count\": 3,\n     \"fee\": 5.99\n   }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Movies"
  },
  {
    "type": "patch",
    "url": "/movies/:id",
    "title": "Update Movie",
    "name": "PatchMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Movie name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>Movie categorys.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the Movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fee",
            "description": "<p>Cost of the Movie.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>Categorys of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fee",
            "description": "<p>Cost of the Movie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"name\": \"Star Trek\",\n  \"categoryIds\": [\"sciFi\", \"adventure\"],\n  \"count\": 3,\n   \"fee\": 5.99\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MovieNotFound",
            "description": "<p>The id of the Movie was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no Movie with this ID\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "/movies",
    "title": "Add Movie to database",
    "name": "PostMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Movie name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>Movie categorys.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the Movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "fee",
            "description": "<p>Cost of the Movie.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>Categorys of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count of the Movie.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "fee",
            "description": "<p>Cost of the Movie.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"name\": \"Star Trek\",\n  \"categoryIds\": [\"sciFi\", \"adventure\"],\n  \"count\": 3,\n   \"fee\": 5.99\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>There are missing parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\",\n  \"details\": \"There are missing parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request all Users",
    "name": "GetUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User[]",
            "optional": false,
            "field": "users",
            "description": "<p>all users.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"_id\": \"588b76d1a74fa8355824189c\",\n    \"id\": 2,\n    \"name\": \"Adam Kulczycki\",\n    \"password\": \"password\",\n    \"admin\": false,\n    \"__v\": 0,\n    \"movies\": []\n  },\n  {\n    \"_id\": \"588b777a02753c1888b551a7\",\n    \"id\": 3,\n    \"name\": \"Daria Zadrożniak\",\n    \"password\": \"password\",\n    \"admin\": false,\n    \"__v\": 2,\n    \"movies\": [\n      6,\n      3\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/movies",
    "title": "Create User",
    "name": "PostUsers",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"User created successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MissingParameters",
            "description": "<p>There are missing parameters.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\",\n  \"details\": \"There are missing parameters\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Users"
  }
] });
