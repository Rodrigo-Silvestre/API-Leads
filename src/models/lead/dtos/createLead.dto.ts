import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
    @ApiProperty({
        description: 'Nome completo do lead',
        example: 'João Silva',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email válido do lead',
        example: 'joao.silva@example.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}