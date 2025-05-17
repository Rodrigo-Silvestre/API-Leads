import { ApiProperty } from '@nestjs/swagger';
import { LeadEntity } from '../lead.entity';
import { ReturnIntentionDto } from '../../intention/dtos/returnIntetion.dto';

export class ReturnLeadDto {
    @ApiProperty({ example: '34c16aa5-3634-430a-9988-a71f0ea4cfd7' })
    id: string;

    @ApiProperty({ example: 'João Silva' })
    name: string;

    @ApiProperty({ example: 'joao@example.com' })
    email: string;

    intentions?: ReturnIntentionDto[];

    constructor(leadEntity: LeadEntity) {
        this.id = leadEntity.id;
        this.name = leadEntity.name;
        this.email = leadEntity.email;
        this.intentions = leadEntity.intentions;
    }
}