import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PlatformService } from '../platform.service';
import { ApiOkResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Platform } from './entities/platform.entity';
import { CreatePlatformDto } from './dtos/create-platform.dto';
import { UpdatePlatformDto } from './dtos/update-platform.dto';

@ApiTags('Platform')
@Controller('platform')
@UsePipes(new ValidationPipe())
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all platforms',
    type: [Platform],
  })
  async getPlatforms() {
    return this.platformService.getPlatforms();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new platform',
    type: Platform,
  })
  async createPlatform(@Body() createPlatformDto: CreatePlatformDto) {
    return this.platformService.createPlatform(createPlatformDto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Update a platform by id',
    type: Platform,
  })
  async updatePlatform(
    @Param('id') id: string,
    @Body() updatePlatformDto: UpdatePlatformDto
  ) {
    return this.platformService.updatePlatform(id, updatePlatformDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Remove a platform by id',
    type: Platform,
  })
  async removePlatform(@Param('id') id: string) {
    return this.platformService.removePlatform(id);
  }
}
