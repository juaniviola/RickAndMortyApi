import 'dotenv/config';

export default {
  app: {
    port: process.env.PORT,
    secret: process.env.SECRET,
    apiUrl: process.env.API_URL,
  },
};
