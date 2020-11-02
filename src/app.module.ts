import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import replyFormMiddleware from 'fastify-reply-from';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CacheModule.register({
      ttl: 5000, // seconds
      max: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true })).forRoutes('cats');
  // }
}
