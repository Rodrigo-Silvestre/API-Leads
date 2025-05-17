import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from '../../../services/lead.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEntity } from '../../lead/lead.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('LeadService', () => {
  let service: LeadService;
  let leadRepository: Repository<LeadEntity>;
  let mailerService: MailerService;

  const leadEntityMock = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Teste Usuário',
    email: 'teste@exemplo.com',
  };

  const mockLeadRepository = {
    save: jest.fn().mockResolvedValue(leadEntityMock),
    find: jest.fn().mockResolvedValue([leadEntityMock]),
    findOne: jest.fn().mockResolvedValue(leadEntityMock),
  };

  const mockMailerService = {
    sendMail: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        {
          provide: getRepositoryToken(LeadEntity),
          useValue: mockLeadRepository,
        },
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    leadRepository = module.get<Repository<LeadEntity>>(getRepositoryToken(LeadEntity));
    mailerService = module.get<MailerService>(MailerService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(leadRepository).toBeDefined();
    expect(mailerService).toBeDefined();
  });

  it('createLead should save lead and send email', async () => {
    const createDto = {
      name: leadEntityMock.name,
      email: leadEntityMock.email,
    };

    const result = await service.createLead(createDto);

    expect(mockLeadRepository.save).toHaveBeenCalledWith(createDto);
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to: createDto.email,
      subject: 'Obrigado pelo seu cadastro!',
      text: `Olá ${createDto.name}, obrigado por se cadastrar conosco!`,
      html: `<b>Olá ${createDto.name}, obrigado por se cadastrar conosco!</b>`,
    });
    expect(result).toMatchObject(leadEntityMock);
  });

  it('getLeadByIdUsingRelations should return array of leads', async () => {
    const result = await service.getLeadByIdUsingRelations();

    expect(mockLeadRepository.find).toHaveBeenCalledWith({ relations: ['intentions'] });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject(leadEntityMock);
  });

  it('findLeadById should throw BadRequestException for invalid UUID', async () => {
    await expect(service.findLeadById('invalid-uuid')).rejects.toThrow(BadRequestException);
  });

  it('findLeadById should throw NotFoundException if lead not found', async () => {
    mockLeadRepository.findOne.mockResolvedValueOnce(null);
    await expect(service.findLeadById(leadEntityMock.id)).rejects.toThrow(NotFoundException);
  });

  it('findLeadById should return lead when found', async () => {
    mockLeadRepository.findOne.mockResolvedValueOnce(leadEntityMock);

    const result = await service.findLeadById(leadEntityMock.id);

    expect(mockLeadRepository.findOne).toHaveBeenCalledWith({ where: { id: leadEntityMock.id } });
    expect(result).toMatchObject(leadEntityMock);
  });
});