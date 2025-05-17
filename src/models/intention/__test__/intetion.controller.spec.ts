import { Test, TestingModule } from '@nestjs/testing';
import { IntentionController } from '../../../controllers/intention.controller';
import { IntentionService } from '../../../services/intention.service';
import { CreateIntentionDto } from '../../../models/intention/dtos/createIntention.dto';
import { AssociateIntentionDto } from '../../../models/intention/dtos/associateIntention.dto';

describe('IntentionController', () => {
  let controller: IntentionController;
  let service: IntentionService;

  const intentionMock = {
    id: '41b89bf5-76cf-4e15-a829-e01affadb611',
    zipcode_start: '01001-000',
    zipcode_end: '02002-000',
    lead: { id: '34c16aa5-3634-430a-9988-a71f0ea4cfd7' },
  };

  const mockIntentionService = {
    createIntention: jest.fn().mockResolvedValue(intentionMock),
    getIntentionByIdUsingRelations: jest.fn().mockResolvedValue([intentionMock]),
    associate: jest.fn().mockResolvedValue(intentionMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntentionController],
      providers: [
        {
          provide: IntentionService,
          useValue: mockIntentionService,
        },
      ],
    }).compile();

    controller = module.get<IntentionController>(IntentionController);
    service = module.get<IntentionService>(IntentionService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createIntention should call service and return created intention', async () => {
    const dto: CreateIntentionDto = {
      zipcode_start: '01001-000',
      zipcode_end: '02002-000',
    };
    const result = await controller.createIntention(dto);
    expect(service.createIntention).toHaveBeenCalledWith(dto);
    expect(result).toEqual(intentionMock);
  });

  it('getIntentionByIdUsingRelations should call service and return intentions', async () => {
    const result = await controller.getIntentionByIdUsingRelations();
    expect(service.getIntentionByIdUsingRelations).toHaveBeenCalled();
    expect(result).toEqual([intentionMock]);
  });

  it('associate should call service with params and return updated intention', async () => {
    const id = '41b89bf5-76cf-4e15-a829-e01affadb611';
    const dto: AssociateIntentionDto = { lead_id: '34c16aa5-3634-430a-9988-a71f0ea4cfd7' };
    const result = await controller.associate(id, dto);
    expect(service.associate).toHaveBeenCalledWith(id, dto);
    expect(result).toEqual(intentionMock);
  });
});