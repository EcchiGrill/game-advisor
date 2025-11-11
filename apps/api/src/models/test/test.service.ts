import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  getTests() {
    return this.prisma.test.findMany();
  }

  createTest() {
    return this.prisma.test.create({});
  }
}
