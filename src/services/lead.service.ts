import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeadDto } from '../models/lead/dtos/createLead.dto';
import { LeadEntity } from '../models/lead/lead.entity';
import { Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { validate as isUUID } from 'uuid';
import { ReturnLeadDto } from '../models/lead/dtos/returnLead.dto';

@Injectable()
export class LeadService {

    constructor(
        @InjectRepository(LeadEntity)
        private readonly leadRepository: Repository<LeadEntity>,
        private readonly mailerService: MailerService
    ) { }

    async createLead(createLeadDto: CreateLeadDto): Promise<ReturnLeadDto> {
        const lead = await this.leadRepository.save(createLeadDto);
        await this.mailerService.sendMail({
            to: createLeadDto.email,
            subject: 'Obrigado pelo seu cadastro!',
            text: `Olá ${createLeadDto.name}, obrigado por se cadastrar conosco!`,
            html: `<b>Olá ${createLeadDto.name}, obrigado por se cadastrar conosco!</b>`,
        });
        return new ReturnLeadDto(lead);
    }

    async getLeadByIdUsingRelations(): Promise<ReturnLeadDto[]> {
        const lead = await this.leadRepository.find({
            relations: ['intentions']
        });
        return lead.map((lead) => new ReturnLeadDto(lead));
    }

    async findLeadById(id: string): Promise<ReturnLeadDto> {
        if (!isUUID(id)) throw new BadRequestException('Invalid ID: must be a valid UUID');
        const lead = await this.leadRepository.findOne({ where: { id } });
        if (!lead) throw new NotFoundException(`Lead with ID ${id} not found`);
        return new ReturnLeadDto(lead);
    }
}