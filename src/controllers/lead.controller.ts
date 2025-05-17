import { Body, Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateLeadDto } from '../models/lead/dtos/createLead.dto';
import { LeadService } from '../services/lead.service';
import { ReturnLeadDto } from '../models/lead/dtos/returnLead.dto';

@ApiTags('Lead')
@Controller('lead')
export class LeadController {

    constructor(private readonly leadService: LeadService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo lead' })
    @ApiResponse({ status: 201, description: 'Lead criado com sucesso', type: ReturnLeadDto })
    async createLead(@Body() createLeadDto: CreateLeadDto) {
        return this.leadService.createLead(createLeadDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os leads com suas relações' })
    @ApiResponse({ status: 200, description: 'Lista de leads', type: [ReturnLeadDto] })
    async getLeadByIdUsingRelations() {
        return this.leadService.getLeadByIdUsingRelations();
    }
}