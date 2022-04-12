# Express, GraphQL example

[![License](https://img.shields.io/badge/License-MIT-blue.svg?maxAge=2592000)](https://github.com/juffalow/express-graphql-sequelize-example/blob/master/LICENSE)
[![](https://github.com/juffalow/express-graphql-example/workflows/Lint/badge.svg)](https://github.com/juffalow/express-graphql-example/actions)
[![](https://github.com/juffalow/express-graphql-example/workflows/Test/badge.svg)](https://github.com/juffalow/express-graphql-example/actions)
[![codecov](https://codecov.io/gh/juffalow/express-graphql-example/branch/master/graph/badge.svg)](https://codecov.io/gh/juffalow/express-graphql-example)

![out](https://user-images.githubusercontent.com/8142965/56870885-6e11dd00-6a16-11e9-8bba-230476808af2.png)

## How to run the project using Docker

```shell
docker-compose up --build
```

Open GraphiQL in your browser [http://localhost:3010/graphql](http://localhost:3010/graphql)

## How to run the project

Install dependencies:

```shell
yarn

# or using npm

npm install
```

Create `src/config.ts` or rename `src/config.example.js` and update file with your credentials:

```js
export default {
  port: 3010,
  database: {
    type: 'mysql',
    connection: {
      database : '',
      host : '',
      password : '',
      user : '',
    },
    /*
     * Migrations run on every start of the application.
     * If you initialized the database manually (from the database.sql file),
     * you don't need this.
     */
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};
```

Run the project:

```shell
yarn start

# or using npm

npm start
```

Open GraphiQL in your browser [http://localhost:3010/graphql](http://localhost:3010/graphql)
