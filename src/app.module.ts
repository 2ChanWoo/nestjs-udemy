import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import * as dbConfig from '../ormconfig';
const cookieSession = require('cookie-session');
//* ㄴ> cookie session이 최신식 import에서는 내부적인 동작 오류가 있다?

// import * as session from 'express-session'; //! 왜 이건 돼고
//! import session from 'express-session'; 이건 안돼는거냐구....
//* cookie-session VS express-session :: https://stackoverflow.com/questions/23566555/whats-the-difference-between-express-session-and-cookie-session
//? 중괄호 없이는 default export 만??

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        //! ㄴ> Validation 에 포함되지 않는 속성은 자동으로 제거됨. .... 난 false 하는게 좋을 것 같은데.. 보안문제로 true 하는게 좋다고 함?!
        //?   ㄴ> (ex, User {email, password} 라고 할 때, body에 {email, password, something} 이렇게 들어오면 controller 에서 body를 찍어봐도 email과 password 밖에 출력되지 않는다.)
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['asdfasfd'],
        }),
        // session({
        //   secret: 'my-secret',
        //   resave: false,
        //   saveUninitialized: false,
        //   // cookie: {secure: true} //? https://docs.nestjs.com/techniques/session
        // }),
      )
      .forRoutes('*');
  }
}
