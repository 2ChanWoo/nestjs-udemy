//! nest를 쓸 떄에는 TypeORM 설정파일로 ts를 쓰지 못한다??
//! 159강 13분

const dbConfig = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities:
    process.env.NODE_ENV === 'dev' ? ['**/*.entity.js'] : ['**/*.entity.ts'], //! !!
  synchronize: false,
};

module.exports = dbConfig;
