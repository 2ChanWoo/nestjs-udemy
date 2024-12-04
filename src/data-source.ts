import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions; // as 요거 불안정 문법

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
      //? entities: ['**/*.entity.ts'] 로 변경할 시, migration명령어는 동작하는데, start:dev는 엔티티파일 문법 오류 발생함..
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
    });
    break;
  case 'prod':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: true, //? 인증(ssl)되지 않은 클라이언트(여기서는 서버를 말함)와 DB서버 의 연결을 차단.
      },
    });
    break;
  default:
    throw new Error('Unknown environment');
}

export const appDataSource = new DataSource(dbConfig as DataSourceOptions);
