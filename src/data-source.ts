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
