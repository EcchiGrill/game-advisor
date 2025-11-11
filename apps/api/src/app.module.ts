import { TestModule } from './models/test/test.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, TestModule],
})
export class AppModule {}
