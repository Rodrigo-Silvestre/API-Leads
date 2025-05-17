import { ApiProperty } from '@nestjs/swagger';
import { ReturnLeadDto } from '../../lead/dtos/returnLead.dto';
import { IntentionEntity } from '../intention.entity';

export class ReturnIntentionDto {
    @ApiProperty({ example: '41b89bf5-76cf-4e15-a829-e01affadb611' })
    id: string;

    @ApiProperty({ example: '01001-000' })
    zipcode_start: string;

    @ApiProperty({ example: '02002-000' })
    zipcode_end: string;

    @ApiProperty({ type: ReturnLeadDto, description: 'Lead associado à intenção', required: false })
    lead?: ReturnLeadDto;

    constructor(intentionEntity: IntentionEntity) {
        this.id = intentionEntity.id;
        this.zipcode_start = intentionEntity.zipcode_start;
        this.zipcode_end = intentionEntity.zipcode_end;

        if (intentionEntity.lead) {
            this.lead = new ReturnLeadDto(intentionEntity.lead);
        }
    }
}