import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session'; //! 왜 이건 돼고
//! import session from 'express-session'; 이건 안돼는거냐구....
//? 중괄호 없이는 default export 만?? 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      // cookie: {secure: true} //? https://docs.nestjs.com/techniques/session
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //! ㄴ> Validation 에 포함되지 않는 속성은 자동으로 제거됨. .... 난 false 하는게 좋을 것 같은데.. 보안문제로 true 하는게 좋다고 함?!
      //?   ㄴ> (ex, User {email, password} 라고 할 때, body에 {email, password, something} 이렇게 들어오면 controller 에서 body를 찍어봐도 email과 password 밖에 출력되지 않는다.)
    }),
  );
  await app.listen(3000);
}
bootstrap();
