import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin-module/admin.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  async login({ email, password }: AuthPayloadDto) {
    const user = await this.adminService.validateAdmin(email, password);

    if (user) {
      return this.jwtService.sign(user);
    }

    return null;
  }
}
