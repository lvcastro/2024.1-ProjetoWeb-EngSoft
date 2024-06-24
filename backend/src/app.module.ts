import { Module } from '@nestjs/common';
import { ReportPinModule } from './report-pin-module/report-pin.module';
import { DatabaseModule } from './database-module/database.module';
import { LoggerModule } from './logger-module/logger.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin-module/admin.module';
import { AuthModule } from './auth-module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth-module/guards/jwt-auth.guard';

@Module({
  imports: [
    ReportPinModule,
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.dev.env'] }),
    AdminModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
