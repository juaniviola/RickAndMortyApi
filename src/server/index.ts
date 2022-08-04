import app from './app';
import config from '../config';

const PORT = config.app.port;

// connect to db and start server
(async () => {
  // tslint:disable-next-line:no-console
  app.listen(PORT, () => console.log(`[server] 🚀 started on port: ${PORT}`));
})();
