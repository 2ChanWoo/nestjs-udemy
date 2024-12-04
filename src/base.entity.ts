import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  //   @PrimaryGeneratedColumn('uuid') //? uuid는 값이 너무 크고.. tsid는 고려할 법 한 듯? 시간순 정렬도 가능하구. 아님 서브로 uuid 쓰던가?
  @PrimaryGeneratedColumn()
  id!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
