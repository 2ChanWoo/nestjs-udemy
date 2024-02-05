import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  //! 강의에서는 private 붙임. 51강 2분 15초 --- 아 그냥 내가 영어라 못알아 들은 것 같은디 //? ++ 아닌가? 어디 문서에서 private 붙이면 안그래도 된다고..?
  // constructor(repo: Repository<User>) {
  //   console.log(repo);
  // }

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    //* create 를 먼저 해 주는 이유는, Entity 객체로 말아 질 때, Validation을 위함.
    //? 그럼.. 여기서는 repo.create 를 했는데, 카카수 플젝에서는 Entity.create 를 하는데 뭐가 다른 걸까
    return this.repo.save(user);
    // return this.repo.create({ email, password });
  }
}
