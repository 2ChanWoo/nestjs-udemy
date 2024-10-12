//! 아 이게 강의처럼 바로 되지 않았던게, ormconfig 를 이제 사용을 안하는 것 같네..
const dbConfig = {
  synchronize: false,
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

module.exports = dbConfig;
