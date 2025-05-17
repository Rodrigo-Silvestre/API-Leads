import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AssociateIntentionDto {

    @ApiProperty({
        description: "ID do lead para associar à intenção",
        example: "a3f1e8e0-1234-4567-89ab-cdef01234567"
    })
    @IsString()
    @IsNotEmpty()
    lead_id: string;
}