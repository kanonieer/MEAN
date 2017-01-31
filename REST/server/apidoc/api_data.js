define({ "api": [
  {
    "type": "post",
    "url": "/authentication",
    "title": "authenticate User",
    "name": "PostAuthentication",
    "group": "Authentication",
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
          "content": "HTTP/1.1 200 Ok\n{\n  \"succes\": true,\n  \"message\": \"Enjoy your token!\",\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Im1vdmllcyI6ImluaXQiLCJfX3YiOiJpbml0IiwiYWRtaW4iOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwibmFtZSI6ImluaXQiLCJpZCI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsIm1vdmllcyI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJpZCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Im1vdmllcyI6W10sIl9fdiI6MCwiYWRtaW4iOmZhbHNlLCJwYXNzd29yZCI6InBhc3N3b3JkIiwibmFtZSI6IkFkYW0gS3VsY3p5Y2tpIiwiaWQiOjIsIl9pZCI6IjU4OGI3NmQxYTc0ZmE4MzU1ODI0MTg5YyJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDg1ODE2NzM5LCJleHAiOjE0ODU5MDMxMzl9.JA-QYeV8GhoT53-KerM4cdikz-SqucputtcpIndJBYs\"\n}",
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
            "field": "UserNotFound",
            "description": "<p>There is no User with this name.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadPassword",
            "description": "<p>Password is incorret.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"Bad Request\",\n  \"details\": \"Authentication failed. User not found.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"code\": 401,\n  \"message\": \"Unauthorized\",\n  \"details\": \"Authentication failed. Wrong password.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Authentication"
  },
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
          "content": "HTTP/1.1 200 OK\n[\n   {\n     \"_id\": \"58890a95df23361c64d6a713\",\n        \"id\": 3,\n        \"__v\": 0,\n     \"name\": \"Dark Tower\",\n     \"categoryIds\": [\"adventure\", \"fantasy\"],\n     \"count\": 1,\n     \"fee\": 8.99\n   },\n   {\n      \"name\": \"Twilight\",\n      \"categoryIds\": [\"fantasy\", \"comedy\"],\n      \"count\": 3,\n      \"fee\": 5.99\n   },\n   {\n     \"name\": \"Star Trek\",\n     \"categoryIds\": [\"sciFi\", \"adventure\"],\n     \"count\": 3,\n     \"fee\": 5.99\n   }\n]",
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
    "url": "/users/:id",
    "title": "Request User information",
    "name": "GetUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>User unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID from MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Paswword of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Check if Admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "__v",
            "description": "<p>Versioning.</p>"
          },
          {
            "group": "Success 200",
            "type": "Movie[]",
            "optional": false,
            "field": "movies",
            "description": "<p>List of the borrowed Movies.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"588b76d1a74fa8355824189c\",\n    \"id\": 2,\n    \"name\": \"Adam Kulczycki\",\n    \"password\": \"password\",\n    \"admin\": false,\n    \"__v\": 0,\n    \"movies\": []\n  }",
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
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no User with this ID\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Users"
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
    "type": "patch",
    "url": "/users/:user_id/movies/:movie_id",
    "title": "Update Borrowerd Movie",
    "name": "PatchBorrowerdMovie",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movie_id",
            "description": "<p>Movie ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"success\": true,\n  \"message\": \"Movie successfully returned\",\n}",
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
            "field": "UserNotFound",
            "description": "<p>There is User with this ID.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoBorrowerd",
            "description": "<p>User does not borrowed this movie.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoMovie",
            "description": "<p>Movie no longer in database.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no User with this ID\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"code\": 409,\n  \"message\": \"Conflict\",\n  \"details\": \"User does not borrowed this movie\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"code\": 409,\n  \"message\": \"Conflict\",\n  \"details\": \"Movie no longer in database\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update User",
    "name": "PatchUser",
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
            "description": "<p>User password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectID",
            "optional": false,
            "field": "_id",
            "description": "<p>ID from MongoDB.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>ID of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Paswword of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "admin",
            "description": "<p>Check if Admin.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "__v",
            "description": "<p>Versioning.</p>"
          },
          {
            "group": "Success 200",
            "type": "Movie[]",
            "optional": false,
            "field": "movies",
            "description": "<p>List of the borrowed Movies.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"588b76d1a74fa8355824189c\",\n    \"id\": 2,\n    \"name\": \"Adam Kulczycki\",\n    \"password\": \"password\",\n    \"admin\": false,\n    \"__v\": 0,\n    \"movies\": []\n  }",
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
            "field": "UserNotFound",
            "description": "<p>The ID of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no User with this ID\"\n}",
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
    "url": "/users/:user_id/movies/:movie_id",
    "title": "Borrow a Movie",
    "name": "PostMovieToUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>User ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movie_id",
            "description": "<p>Movie ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"succes\":true,\n  \"message\":\"Movie successfully borrowed\"\n}",
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
            "field": "UserNotFound",
            "description": "<p>There is User with this ID.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AlreadyBorrowerd",
            "description": "<p>User borrowed this Movie before.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "MovieNotFound",
            "description": "<p>There is Movie with this ID.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "OutOfStock",
            "description": "<p>Quantity of this Movie is zero.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no User with this ID\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"code\": 409,\n  \"message\": \"Conflict\",\n  \"details\": \"User already borrowed that movie\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"Not Found\",\n  \"details\": \"There is no Movie with this ID\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"code\": 409,\n  \"message\": \"Conflict\",\n  \"details\": \"Movie out of stock\"\n}",
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
    "url": "/users",
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
