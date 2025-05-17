import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociateIntentionDto } from '../models/intention/dtos/associateIntention.dto';
import { CreateIntentionDto } from '../models/intention/dtos/createIntention.dto';
import { IntentionEntity } from '../models/intention/intention.entity';
import { LeadEntity } from '../models/lead/lead.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { LeadService } from './lead.service';
import { ReturnIntentionDto } from '../models/intention/dtos/returnIntetion.dto';

@Injectable()
export class IntentionService {

    constructor(
        @InjectRepository(IntentionEntity)
        private readonly intentionRepository: Repository<IntentionEntity>,
        private readonly leadService: LeadService,
    ) { }

    async createIntention(createIntentionDto: CreateIntentionDto): Promise<ReturnIntentionDto> {
        return new ReturnIntentionDto(await this.intentionRepository.save(createIntentionDto));
    }

    async getIntentionByIdUsingRelations(): Promise<ReturnIntentionDto[]> {
        const intentions = await this.intentionRepository.find({
            relations: ['lead']
        });
        return intentions.map((intention) => new ReturnIntentionDto(intention))
    }

    async findIntentionById(id: string): Promise<ReturnIntentionDto> {
        if (!isUUID(id)) throw new BadRequestException('Invalid ID: must be a valid UUID');
        const intention = await this.intentionRepository.findOne({ where: { id }, relations: ['lead'] });
        if (!intention) throw new NotFoundException(`Intent with ID ${id} not found`);
        return new ReturnIntentionDto(intention);
    }

    async associate(id: string, associateIntentionDto: AssociateIntentionDto): Promise<ReturnIntentionDto> {
        const intention = await this.findIntentionById(id);
        await this.leadService.findLeadById(associateIntentionDto.lead_id);
        const lead = new LeadEntity();
        lead.id = associateIntentionDto.lead_id;
        intention.lead = lead;
        return new ReturnIntentionDto(await this.intentionRepository.save(intention));
    }
}