import http from 'http';
import app from '../../src/server/app';

export default class Server {
  public httpServer?: http.Server;

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = app.listen(3000, () => {
        resolve();
      });
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
