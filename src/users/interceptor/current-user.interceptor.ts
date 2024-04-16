import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
//* 왜 이게 있어야지만 userService가 실행?가능해지는거지?
//* @Injectable() 데코레이터를 사용하면 Interceptor 클래스의 생성자에 다른 객체를 주입받을 수 있습니다 ??
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    //? session 은 키밸류 객체인가.?> ㅇㅇ

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user; //* Decorator 에서 사용가능하도록 interceptor 에서 usersScervice 를 종속 주입받아 request에 넣어준다.
    }

    return next.handle();
  }
}
