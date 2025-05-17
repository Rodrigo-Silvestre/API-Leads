import { Test, TestingModule } from '@nestjs/testing';
import { IntentionService } from '../../../services/intention.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IntentionEntity } from '../intention.entity';
import { LeadService } from '../../../services/lead.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('IntentionService', () => {
  let service: IntentionService;
  let intentionRepository: Repository<IntentionEntity>;
  let leadService: LeadService;

  const intentionEntityMock = {
    id: '41b89bf5-76cf-4e15-a829-e01affadb611',
    zipcode_start: '01001-000',
    zipcode_end: '02002-000',
    lead: {
      id: '34c16aa5-3634-430a-9988-a71f0ea4cfd7',
      name: 'João Silva',
      email: 'joao.silva@example.com',
    },
  };

  const mockIntentionRepository = {
    save: jest.fn().mockResolvedValue(intentionEntityMock),
    find: jest.fn().mockResolvedValue([intentionEntityMock]),
    findOne: jest.fn().mockResolvedValue(intentionEntityMock),
  };

  const mockLeadService = {
    findLeadById: jest.fn().mockResolvedValue(intentionEntityMock.lead),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntentionService,
        {
          provide: getRepositoryToken(IntentionEntity),
          useValue: mockIntentionRepository,
        },
        {
          provide: LeadService,
          useValue: mockLeadService,
        },
      ],
    }).compile();

    service = module.get<IntentionService>(IntentionService);
    intentionRepository = module.get<Repository<IntentionEntity>>(getRepositoryToken(IntentionEntity));
    leadService = module.get<LeadService>(LeadService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(intentionRepository).toBeDefined();
    expect(leadService).toBeDefined();
  });

  it('createIntention should save and return DTO', async () => {
    const createDto = {
      zipcode_start: intentionEntityMock.zipcode_start,
      zipcode_end: intentionEntityMock.zipcode_end,
    };
    const result = await service.createIntention(createDto);
    expect(mockIntentionRepository.save).toHaveBeenCalledWith(createDto);
    expect(result).toMatchObject({
      id: intentionEntityMock.id,
      zipcode_start: intentionEntityMock.zipcode_start,
      zipcode_end: intentionEntityMock.zipcode_end,
    });
  });

  it('getIntentionByIdUsingRelations should return list of DTOs', async () => {
    const result = await service.getIntentionByIdUsingRelations();
    expect(mockIntentionRepository.find).toHaveBeenCalledWith({ relations: ['lead'] });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({
      id: intentionEntityMock.id,
      zipcode_start: intentionEntityMock.zipcode_start,
      zipcode_end: intentionEntityMock.zipcode_end,
    });
  });

  it('findIntentionById should throw on invalid UUID', async () => {
    await expect(service.findIntentionById('invalid-uuid')).rejects.toThrow(BadRequestException);
  });

  it('findIntentionById should throw on not found', async () => {
    mockIntentionRepository.findOne.mockResolvedValueOnce(null);
    await expect(service.findIntentionById(intentionEntityMock.id)).rejects.toThrow(NotFoundException);
  });

  it('findIntentionById should return DTO if found', async () => {
    mockIntentionRepository.findOne.mockResolvedValueOnce(intentionEntityMock);
    const result = await service.findIntentionById(intentionEntityMock.id);
    expect(mockIntentionRepository.findOne).toHaveBeenCalledWith({ where: { id: intentionEntityMock.id }, relations: ['lead'] });
    expect(result).toMatchObject({
      id: intentionEntityMock.id,
      zipcode_start: intentionEntityMock.zipcode_start,
      zipcode_end: intentionEntityMock.zipcode_end,
    });
  });

  it('associate should call leadService and save intention', async () => {
    const associateDto = { lead_id: intentionEntityMock.lead.id };

    jest.spyOn(service, 'findIntentionById').mockResolvedValue({
      ...intentionEntityMock,
      lead: null,
    } as any);

    const result = await service.associate(intentionEntityMock.id, associateDto);

    expect(mockLeadService.findLeadById).toHaveBeenCalledWith(associateDto.lead_id);
    expect(mockIntentionRepository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      id: intentionEntityMock.id,
      zipcode_start: intentionEntityMock.zipcode_start,
      zipcode_end: intentionEntityMock.zipcode_end,
    });
  });
});