/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

//* You can dramatically speed up your tests by updating the package.json file
//* "test:watch": "jest --watch --maxWorkers=1",

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * users.length),
          email: email,
          password: password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          //* 의미가..
          provide: UsersService, //* 누군가 UsersServuce를 요청하면
          useValue: fakeUsersService, //* useValue에 있는 값(fakeUsersService)를 대신 전해주세요. 라는 의미?!
        },
      ],
    }).compile(); //For unit tests, the important one is the compile() method. This method bootstraps a module with its dependencies (similar to the way an application is bootstrapped in the conventional main.ts file using NestFactory.create()), and returns a module that is ready for testing.
    //단위 테스트의 경우 중요한 것은 compile() 메서드입니다.
    //이 메서드는 종속성으로 모듈을 부트스트랩하고(기존의 main.ts 파일에서 NestFactory.create()를 사용하여 애플리케이션을 부트스트랩하는 방식과 유사),
    //테스트할 준비가 된 모듈을 반환합니다.

    service = module.get(AuthService);
    //compile() 메서드는 비동기적이므로 기다려야 합니다. 모듈이 컴파일되면 get() 메서드를 사용하여 모듈이 선언한 모든 정적 인스턴스(++동적 인스턴스는 resolve)(컨트롤러 및 프로바이더)를 검색할 수 있습니다. The compile() method is asynchronous and therefore has to be awaited. Once the module is compiled you can retrieve any static instance it declares (controllers and providers) using the get() method.
  });

  it('can create an instace of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@asdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: '1', password: '1' } as User]);

    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'passowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('asdf@asdf.com', 'mypassword');

    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
