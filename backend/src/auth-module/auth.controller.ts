import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/custom-decorators/decorators';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() authPayload: AuthPayloadDto) {
    return this.authService.login(authPayload);
  }
}
