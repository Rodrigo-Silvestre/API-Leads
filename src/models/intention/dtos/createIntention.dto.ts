import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIntentionDto {
    @ApiProperty({
        description: 'CEP de origem',
        example: '01001-000',
    })
    @IsString()
    @IsNotEmpty()
    zipcode_start: string;

    @ApiProperty({
        description: 'CEP de destino',
        example: '02002-000',
    })
    @IsString()
    @IsNotEmpty()
    zipcode_end: string;
}