module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL: process.env.DATABASE_URL || "postgresql://postgres@localhost/maintenancetracker",
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  JWT_SECRET: "jwtSecret"
};

