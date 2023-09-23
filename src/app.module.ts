import { Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, ModuleRef } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { bullConfig } from './common/config/bull.config';
import { dataSource } from '../data-source';
import { AuthModule } from './auth/auth.module';
import globalConfig, { GlobalConfig } from './common/config/global.config';
import { TIME_ZONE } from './common/constants/global.constant';
import { AppEnvironment } from './common/enums/app.enum';
import { AllExceptionsFilter } from './common/filters/all.filter';
import { ServiceSellModule } from './service-sell/service-sell.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    // RedisModule.forRootAsync(redisConfig),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => globalConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        initializeTransactionalContext();
        return addTransactionalDataSource(dataSource);
      },
    }),
    UtilsModule,
    AuthModule,
    ServiceSellModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { exposeDefaultValues: true },
      }),
    },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private configService: ConfigService<GlobalConfig>,
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault(TIME_ZONE);

    const isLocalOrTest = [AppEnvironment.LOCAL, AppEnvironment.TEST].includes(
      this.configService.get('environment'),
    );

    if (isLocalOrTest) return;
  }
}
