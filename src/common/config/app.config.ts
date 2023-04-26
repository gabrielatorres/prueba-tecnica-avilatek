export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodbUrl:
    process.env.MONGODB_URL || 'mongodb://localhost:27017/prueba-avilatek',
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});
