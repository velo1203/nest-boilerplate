import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() loginDto: LoginDto) {
    const user = this.authService.validateUser(loginDto);
    if (!user) throw new HttpException('User not found', 401);
    return user;
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return 'hello';
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('req.user: ', req.user);
    console.log(req.user);
  }
}
