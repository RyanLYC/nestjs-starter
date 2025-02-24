import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import 'winston-daily-rotate-file';
// import { AllExceptionFilter } from './filters/all-exception.filter';
import { LoggerService } from '@nestjs/common';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.setGlobalPrefix('api/v1');
  const httpAdapter = app.get(HttpAdapterHost);
  const logger: LoggerService = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  // 全局Filter只能有一个
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
