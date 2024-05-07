import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto): Promise<any> {
    const findUser = await this.userService.findone(email);
    console.log('findUser: ', findUser);
    if (!findUser) return null;
    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign({ user });
    }
    return null;
  }
}
