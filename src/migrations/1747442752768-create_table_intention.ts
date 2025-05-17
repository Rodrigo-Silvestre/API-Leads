import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableIntention1747442752768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.intention (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                zipcode_start character varying NOT NULL,
                zipcode_end character varying NOT NULL,
                lead_id uuid,
                PRIMARY KEY (id),
                FOREIGN KEY (lead_id) REFERENCES public.lead(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.intention;
        `)
    }
}