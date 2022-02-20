module.exports = {
  "development": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": "ask.it",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": "ask.it",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}
