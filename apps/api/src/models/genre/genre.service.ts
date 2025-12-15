import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGenreDto } from './rest/dtos/create-genre.dto';
import { UpdateGenreDto } from './rest/dtos/update-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async getGenres() {
    return this.prisma.genre.findMany();
  }

  async createGenre(data: CreateGenreDto) {
    return this.prisma.genre.create({
      data,
    });
  }

  async updateGenre(id: string, data: UpdateGenreDto) {
    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  async removeGenre(id: string) {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
