import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from '../../../controllers/lead.controller';
import { LeadService } from '../../../services/lead.service';
import { CreateLeadDto } from '../../../models/lead/dtos/createLead.dto';

describe('LeadController', () => {
  let controller: LeadController;
  let service: LeadService;

  const leadMock = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Teste Usuário',
    email: 'teste@exemplo.com',
  };

  const mockLeadService = {
    createLead: jest.fn().mockResolvedValue(leadMock),
    getLeadByIdUsingRelations: jest.fn().mockResolvedValue([leadMock]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [
        {
          provide: LeadService,
          useValue: mockLeadService,
        },
      ],
    }).compile();

    controller = module.get<LeadController>(LeadController);
    service = module.get<LeadService>(LeadService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createLead should call service with dto and return lead', async () => {
    const dto: CreateLeadDto = { name: leadMock.name, email: leadMock.email };
    const result = await controller.createLead(dto);

    expect(service.createLead).toHaveBeenCalledWith(dto);
    expect(result).toEqual(leadMock);
  });

  it('getLeadByIdUsingRelations should call service and return leads array', async () => {
    const result = await controller.getLeadByIdUsingRelations();

    expect(service.getLeadByIdUsingRelations).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toEqual(leadMock);
  });
});