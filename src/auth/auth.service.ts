import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { passwordHash } from 'src/utils/passwordHash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<any> {
    const findUser = await this.userService.findone(email);
    console.log('findUser: ', findUser);
    if (!findUser) return null;
    if (passwordHash.comparePasswords(password, findUser.password)) {
      const { password, ...user } = findUser;
      return this.jwtService.sign({ user });
    }
    return null;
  }

  async registerUser({ email, password, name }: RegisterDto): Promise<any> {
    const finduser = await this.userService.findone(email);
    if (finduser) return null;
    const hashed = await passwordHash.hashPassword(password);
    return this.userService.createUser(email, hashed, name);
  }
}
