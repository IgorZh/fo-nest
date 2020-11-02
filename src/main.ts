import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastifyHttpProxy from 'fastify-http-proxy';
import fastifyReplyFrom from 'fastify-reply-from';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.register(fastifyHttpProxy, {
  //   upstream: 'http://www.example.org',
  //   prefix: '/api/',
  //   http2: false,
  // });
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
