import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  /*
   * [OneToMany] 의 첫번째 파라미터에 굳이 타입을 반환하는 함수를 사용하는지에 대하여.
   *  >> 순환 종속성 문제 때문에.
   *  User.entity.ts 에서는 Report를 참조하고 있고, Report.entity.ts 에서는 User를 참조하고 있음.
   *
   *  여기 최상단과 Report.entity 상단에 console.log 로 상대되는 타입을 찍어보면
   *  (user.entity 에는 log(Report), report.entity 에는 log(User))
   *  실행 시 user.entity 에서 나온건 "Undefined"로 나옴.
   *  따라서 함수를 이용하여 각 파일이 로드된 이후에, 서로 순환참조 될 수 있도록 하기 위함임.
   */
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert() //* 근데... service의 create() 직후 로그보다는 느리게 발생함.
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }
}
