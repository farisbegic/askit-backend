module.exports = {
  "development": {
    "username": process.env.DBUSERNAME || "postgres",
    "password": process.env.DBPASSWORD || "postgres",
    "database": "ask.it",
    "host": "127.0.0.1", // add DBHOST for Docker in .env
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DBUSERNAME || "postgres",
    "password": process.env.DBPASSWORD || "postgres",
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
