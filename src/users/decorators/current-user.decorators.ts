import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //* ExecutionContext: HTTP 프로토콜의 request 뿐만이 아니라,
    //* GRPC, Socket 등 여러 통신 프로토콜에 동등하게 동작하는 객체
    //* data 는, decorator 를 사용할 때 들어가는 param. (ex, @CurrentUser('요기!) user: User)

    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
