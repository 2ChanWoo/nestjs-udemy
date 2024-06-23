import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'user@example8.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'password' })
      .expect(201)
      .then((res) => {
        const { id, email, password } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
        expect(password).toBeUndefined();
      });
    //* 위처럼 메서드 체이닝에서 오류가 나면 정확한 오류가 발견이 되지 않는건가?
    //* 로그 출력해보려고 메서드 하나씩 변수 할당하여 호출하려고 코드 수정하니,
    //* 터미널에서 오류 문구도 제대로 나왔다.
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf@asdf.com';

    //* signup request는 쿠키로 응답하기 때문에, 쿠키를 받을 객체가 필요
    //* test 에서 cookie는 지원하지 않기 떄문에, 변수에 할당하여 직접 꺼내야 함.
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    console.log(cookie);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
