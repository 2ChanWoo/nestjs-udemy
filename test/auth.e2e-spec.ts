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
});
