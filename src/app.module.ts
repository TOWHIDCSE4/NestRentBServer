import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Service } from './user/Manage/entities/service.entity';
import { MoService } from './user/Manage/MoService/entity/mo-service';
import { MoServiceModule } from './user/Manage/MoService/mo-service.module';
import { ServiceModule } from './user/Manage/service.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE,
      entities: [User, Service, MoService],
      synchronize: true,
    }),
    AuthModule,
    UtilsModule,
    ServiceModule,
    MoServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
