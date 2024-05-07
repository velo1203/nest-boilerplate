import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type User = any;

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findone(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
