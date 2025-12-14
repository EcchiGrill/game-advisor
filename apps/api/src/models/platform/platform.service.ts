import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePlatformDto } from './rest/dtos/create-platform.dto';
import { UpdatePlatformDto } from './rest/dtos/update-platform.dto';

@Injectable()
export class PlatformService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlatforms() {
    return this.prisma.platform.findMany();
  }

  async createPlatform(data: CreatePlatformDto) {
    return this.prisma.platform.create({
      data,
    });
  }

  async updatePlatform(id: string, data: UpdatePlatformDto) {
    return this.prisma.platform.update({
      where: { id },
      data,
    });
  }

  async removePlatform(id: string) {
    return this.prisma.platform.delete({
      where: { id },
    });
  }
}
