import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log('UsersService.create()');

    const user = this.repo.create({ email, password });
    //Creates a new entity instance and copies all entity properties from this object into a new entity.
    //Note that it copies only properties that are present in entity schema.
    console.log('UsersService.create() - after creating');
    //* create 를 먼저 해 주는 이유는, Entity 객체로 말아 질 때, Validation을 위함.
    //? 그럼.. 여기서는 repo.create 를 했는데, 카카수 플젝에서는 Entity.create 를 하는데 뭐가 다른 걸까
    //? ㄴ> 메서드 주석 읽어보면, 똑같음 ㅎ
    return this.repo.save(user); //Finds entities that match given find options.
    // return this.repo.create({ email, password });
  }
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
    // Finds first entity that matches given where condition. If entity was not found in the database - returns null.
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
    //Finds entities that match given find options.
  }

  //! 56강. 강의에서는 hook때문에 DB를 두 번 호출하게 되는 find-save 메서드를 사용.
  //! 카카수 플젝에서는 DB 한 번 호출하게 되는, update() 메서드를 사용!   ..... 훅 없이 log 로 출력하면 되니께.. update가 낫겄지?
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('uesr not found');
      //! 본래 Error handling은 controller 에서 하는 것이 맞다고 함(controller/findone 에서 한 것 처럼.).(note)
      //! 하지만 여기 update, delete 는 조금 challenge 해서 그냥 이렇게 했다고..
    }
    Object.assign(user, attrs); //* copyWith 같은 거.   ... 반환값이 있는데, 얕은 복사로 새 값 넣어져서 새 인스턴스로 만들지 않아도 되나보넹
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('uesr not found');
    }
    return this.repo.remove(user);
  }
}
