import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  synchronize: false,
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
};

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
    });
    break;
  case 'prod':
    Object.assign(dbConfig, {});
    break;
  default:
    throw new Error('Unknown environment');
}

export const appDataSource = new DataSource(dbConfig as DataSourceOptions);
