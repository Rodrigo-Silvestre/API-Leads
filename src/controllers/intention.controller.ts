import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateIntentionDto } from "../models/intention/dtos/createIntention.dto";
import { IntentionService } from '../services/intention.service';
import { AssociateIntentionDto } from '../models/intention/dtos/associateIntention.dto';
import { ReturnIntentionDto } from '../models/intention/dtos/returnIntetion.dto';

@ApiTags('Intention')
@Controller('intention')
export class IntentionController {

    constructor(private readonly intentionService: IntentionService) { }

    @Post()
    @ApiOperation({ summary: 'Cria uma nova intenção' })
    @ApiResponse({ status: 201, description: 'Intenção criada com sucesso.', type: ReturnIntentionDto })
    async createIntention(@Body() createIntentionDto: CreateIntentionDto) {
        return this.intentionService.createIntention(createIntentionDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todas as intenções com relação ao lead' })
    @ApiResponse({ status: 200, description: 'Lista de intenções.', type: [ReturnIntentionDto] })
    async getIntentionByIdUsingRelations() {
        return this.intentionService.getIntentionByIdUsingRelations();
    }

    @Put(':intention_id')
    @ApiOperation({ summary: 'Associa um lead à intenção pelo ID da intenção' })
    @ApiResponse({ status: 200, description: 'Intenção atualizada com lead associado.', type: ReturnIntentionDto })
    async associate(@Param('intention_id') id: string, @Body() associateIntentionDto: AssociateIntentionDto) {
        return this.intentionService.associate(id, associateIntentionDto);
    }
}