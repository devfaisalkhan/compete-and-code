export default () => ({
  // Server Configuration
  localPort: process.env.LOCAL_PORT || 3000,
  
  // JWT Configuration
  accessTokenSecret: process.env.ACCESS_TOKEN_KEY,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  
  // Database Configuration
  databaseLocation: process.env.DATABASE_LOCATION,
  seedData: process.env.SEED_DATA === 'true',
  
  // Application Configuration
  appUrl: process.env.APP_URL,
  appName: process.env.APP_NAME,

  // files destination
  FILES_DESTINATION: process.env.FILES_DESTINATION,
  
  // Email Configuration
  email: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    secure: process.env.EMAIL_SECURE === 'true',
    from: process.env.EMAIL_FROM,
  },
});
