import { MigrationInterface, QueryRunner } from "typeorm";

export class Keep1705031724506 implements MigrationInterface {
  name = "Keep1705031724506";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("use_id" SERIAL NOT NULL, "use_name" character varying NOT NULL, CONSTRAINT "pk_use_name" PRIMARY KEY ("use_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("pos_id" SERIAL NOT NULL, "pos_title" character varying NOT NULL, "pos_content" character varying NOT NULL, "use_id" integer, CONSTRAINT "pk_pos_id" PRIMARY KEY ("pos_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "fk_pos_use" FOREIGN KEY ("use_id") REFERENCES "user"("use_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "fk_pos_use"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
