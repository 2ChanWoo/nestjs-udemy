import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user; //* user.id 만 넣는게 아님. TypeORM 에서 설정한대로 User인스턴스에서 id만 추출해 넣음(디비에 저장할 때).
    return this.repo.save(report); //* 근데 또, 반환은 유저정보 전부(패스워드 포함) 반환(응답)됨. 그래서 직렬화 해 줘야 함.
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });
    //  findOne은 조금 더 다테일한 설정이 가능. user에서 쓴 findOneBy는 위 findOne에서 where이 기본 파람으로 들어감.
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.repo.save(report);
  }
}
