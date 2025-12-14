import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlatformService } from '../platform.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Platform } from './entities/platform.entity';

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
}
