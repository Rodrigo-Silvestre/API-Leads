import { Module } from '@nestjs/common';
import { IntentionController } from '../../controllers/intention.controller';
import { IntentionEntity } from './intention.entity';
import { IntentionService } from '../../services/intention.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadModule } from '../lead/lead.module';

@Module({
  imports: [TypeOrmModule.forFeature([IntentionEntity]), LeadModule],
  controllers: [IntentionController],
  providers: [IntentionService],
  exports: [IntentionService],
})
export class IntentionModule { }