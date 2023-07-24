import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as express from 'express';
const Arena = require('bull-arena');
import { iocContainer } from './inversify.config';
import { ArenaUtil, AuthService, FRAMEWORK_TYPES } from 'swiss-army';
import { ServerConfig } from './config/server.config';
import * as path from 'path';
import { PUBLIC_KEY, PRIVATE_KEY } from './constants/keys.constants';
import TYPES from './constants/types.constants';
import Bugsnag from '@bugsnag/js';

dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// Start the server
const server = new InversifyExpressServer(iocContainer);
// Initialize the server configuration
const serverConfig = iocContainer.get<ServerConfig>(FRAMEWORK_TYPES.ServerConfig);
serverConfig.initialize();

// import the routes
import './controllers/_manifests/controller.manifest';

// Initialize the auth utility
AuthService.privateKey = PRIVATE_KEY;
AuthService.publicKey = PUBLIC_KEY;
AuthService.jwtIssuer = 'DragonFire Technologies, LLC.';
AuthService.jwtAudience = 'http://batchleadstacker.com';

// ## YOEMAN INSERTION POINT 2 ## //

// ## Subscribe the redis server ## //
// const redisUtil = new RedisClient(serverConfig);
// redisUtil.subscribe();

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.set('port', serverConfig.port);
  app.use(cors());
  app.use(bodyParser.text());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
  app.use(helmet());
  const cacheTime = 31536000;
  app.use(express.static('assets', { maxAge: cacheTime }));
  // app.use('/', arenaConfig);
});

server.setErrorConfig((app) => {
  app.use((err, req, res, next) => {
    if (err) {
      console.log(err);
      Bugsnag.notify(err);
    }
    next();
  });
});

const app = server.build();
const instance = app.listen(app.get('port'), '0.0.0.0', () => {
  console.log(' App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
});
