import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin-module/admin.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: 'jucabala',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
