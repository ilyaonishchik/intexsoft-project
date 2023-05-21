import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem'),
  };

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });
  app.enableCors({
    origin: [process.env.CLIENT_URL, 'https://yookassa.ru'],
    credentials: true,
  });
  // app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  await app.init();

  http.createServer(server).listen(3000);
  https.createServer(httpsOptions, server).listen(443);
}
bootstrap();
