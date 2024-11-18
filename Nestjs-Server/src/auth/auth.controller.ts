import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGaurd } from './auth.gaurd';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log(signInDto.email, signInDto.password);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGaurd)
  @Get('profile')
  @Roles(Role.VENDOR)
  getProfile(@Request() req) {
    return req.user;
  }
}
