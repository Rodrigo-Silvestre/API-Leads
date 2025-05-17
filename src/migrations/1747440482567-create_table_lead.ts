import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLead1747440482567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.lead (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name character varying NOT NULL,
                email character varying NOT NULL,
                PRIMARY KEY (id)
            );   
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE public.lead;
        `)
    }
}