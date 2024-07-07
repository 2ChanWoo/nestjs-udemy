import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../users.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    console.log(`CurrentUserMiddleware userId: ${userId}`);

    //* TypeScript의 경우, 기본적으로 strictNullChecks 옵션이 켜져 있지 않으면 null이나 undefined에 대해 예외를 발생시키지 않고
    //* 그냥 undefined를 할당합니다. 또한, 최신 버전의 JavaScript 엔진에서는 디스트럭처링 과정에서 null 또는 undefined가 주어졌을 때
    //* 예외가 발생하지 않고 undefined를 반환하도록 처리하기 때문에 의도한 대로 동작할 수 있습니다.

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
