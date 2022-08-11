import app from './app';
import config from '../config';
import RedisCacheRepository from '../dataSources/RedisCacheRepository';

const PORT = config.app.port;

// connect to db and start server
(async () => {
  await RedisCacheRepository.connect();

  // tslint:disable-next-line:no-console
  app.listen(PORT, () => console.log(`[server] 🚀 started on port: ${PORT}`));
})();
