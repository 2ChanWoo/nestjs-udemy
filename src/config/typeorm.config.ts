import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { appDataSource } from '../data-source';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    console.log(
      `\nRunning in 🌈 🌈 🌈 ${process.env.NODE_ENV} 🌈 🌈 🌈 mode ! ! ! !\n`,
    );

    return appDataSource.options;
    // return {
    //   type: 'sqlite',
    //   synchronize: false,
    //   database: this.configService.get<string>('DB_NAME'),
    //   autoLoadEntities: true,
    //   migrations: [__dirname + '/migrations/*.ts'],
    //   logging: true,
    // };
  }
}
