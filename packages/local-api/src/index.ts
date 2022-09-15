import express from 'express';
import path from 'path';
import { createCellsRouter } from './routes/cell';
// import { createProxyMiddleware } from 'http-proxy-middleware';

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();

  // channel request through routes
  app.use(createCellsRouter(filename, dir));

  const packagePath = require.resolve(
    '@javascriptnotebook/local-client/build/index.html'
  );
  app.use(express.static(path.dirname(packagePath)));
  // setting up proxy to catch requests going to react app
  // app.use(
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000/',
  //     ws: true,
  //   })
  // );

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
