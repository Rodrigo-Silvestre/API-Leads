import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { LeadEntity } from "../lead/lead.entity";

@Entity({ name: 'intention' })
export class IntentionEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'zipcode_start', nullable: false })
    zipcode_start: string

    @Column({ name: 'zipcode_end', nullable: false })
    zipcode_end: string

    @ManyToOne(() => LeadEntity, (leadEntity) => leadEntity.intentions)
    @JoinColumn({ name: 'lead_id', referencedColumnName: 'id' })
    lead?: LeadEntity
}