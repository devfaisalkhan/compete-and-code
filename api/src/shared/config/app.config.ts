export default () => ({
  // Server Configuration
  localPort: process.env.LOCAL_PORT || 3000,
  
  // JWT Configuration
  accessTokenSecret: process.env.ACCESS_TOKEN_KEY || 'at-secret',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'rt-secret',
  jwtSecret: process.env.JWT_SECRET || 'jwt-secret',
  
  // Database Configuration
  databaseLocation: process.env.DATABASE_LOCATION || './_db/APP.db',
  seedData: process.env.SEED_DATA === 'true',
  
  // Application Configuration
  appUrl: process.env.APP_URL || 'http://localhost/',
  appName: process.env.APP_NAME || 'compete-and-code',
  
  // Email Configuration
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    username: process.env.EMAIL_USERNAME || 'dev.faisalkhan@gmail.com',
    password: process.env.EMAIL_PASSWORD || 'fdln giyg ifpt unlt',
    secure: process.env.EMAIL_SECURE === 'true',
    from: process.env.EMAIL_FROM || 'No Reply <no-reply@example.com>',
  },
});
