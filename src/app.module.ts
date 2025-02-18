import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string().ip(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '8.134.104.190',
      port: 3310,
      username: 'root',
      password: 'example',
      database: 'testdb',
      entities: [],
      // 同步本地的schema与数据库 -> 初始化的时候去使用
      synchronize: true,
      logging: ['error'],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
