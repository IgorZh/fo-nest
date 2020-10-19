import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import replyFormMiddleware from 'fastify-reply-from';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(createProxyMiddleware({ target: 'http://www.example.org', changeOrigin: true })).forRoutes('cats');
  // }
}
