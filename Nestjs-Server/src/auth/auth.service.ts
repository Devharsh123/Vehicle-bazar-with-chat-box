import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // console.log(email, 'email');
    const user = await this.usersService.findOne(email);

    if (user?.password != pass) {
      throw new UnauthorizedException();
    }
    // console.log(user, 'user');
    const { password, ...result } = user;
    const payload = {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
