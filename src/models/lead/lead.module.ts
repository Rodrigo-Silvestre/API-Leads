import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './lead.entity';
import { LeadController } from '../../controllers/lead.controller';
import { LeadService } from '../../services/lead.service';

@Module({
    imports: [TypeOrmModule.forFeature([LeadEntity])],
    controllers: [LeadController],
    providers: [LeadService],
    exports: [LeadService],
})
export class LeadModule { }