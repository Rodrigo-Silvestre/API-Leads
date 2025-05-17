import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { IntentionEntity } from "../intention/intention.entity";

@Entity({ name: 'lead' })
export class LeadEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'email', nullable: false })
    email: string

    @OneToMany(() => IntentionEntity, (intentionEntity) => intentionEntity.lead)
    intentions?: IntentionEntity[];
}