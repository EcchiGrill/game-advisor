import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from '../test.controller';
import { TestService } from '../test.service';

describe('TestController', () => {
  let controller: TestController;

  const mockAppService = {
    createTest: jest.fn().mockResolvedValue({
      uid: 'test-uuid',
      value: 1,
    }),
    getTests: jest.fn().mockResolvedValue([
      {
        uid: 'test-uuid',
        value: 1,
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [
        {
          provide: TestService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTests', () => {
    it('should return tests data', async () => {
      const result = await controller.getTests();

      expect(mockAppService.getTests).toHaveBeenCalled();
      expect(result).toEqual([
        {
          uid: 'test-uuid',
          value: 1,
        },
      ]);
    });

    it('should handle errors', async () => {
      mockAppService.createTest.mockRejectedValueOnce(
        new Error('Get Tests error')
      );

      await expect(controller.createTest()).rejects.toThrow('Get Tests error');
    });
  });

  describe('createTest', () => {
    it('should create test data', async () => {
      const result = await controller.createTest();

      expect(mockAppService.createTest).toHaveBeenCalled();
      expect(result).toEqual({
        uid: 'test-uuid',
        value: 1,
      });
    });

    it('should handle errors', async () => {
      mockAppService.createTest.mockRejectedValueOnce(
        new Error('Test Creation error')
      );

      await expect(controller.createTest()).rejects.toThrow(
        'Test Creation error'
      );
    });
  });
});
