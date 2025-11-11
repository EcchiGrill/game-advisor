import { Controller, Get, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TestEntity } from './entity/test.entity';

@ApiTags('test')
@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @ApiCreatedResponse({
    description: 'Checking GET route..',
    type: [TestEntity],
  })
  @Get()
  getTests() {
    return this.service.getTests();
  }

  @ApiCreatedResponse({
    description: 'Checking POST route..',
    type: [TestEntity],
  })
  @Post()
  createTest() {
    return this.service.createTest();
  }
}
