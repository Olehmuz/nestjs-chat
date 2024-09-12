import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChannelTable1725809395111 implements MigrationInterface {
  name = 'CreateChannelTable1725809395111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "channel" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "createdById" integer, CONSTRAINT "PK_590f33ee6ee7d76437acf362e39" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "channel" ADD CONSTRAINT "FK_b2207f24c9461a9e053f2d2e090" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "channel" DROP CONSTRAINT "FK_b2207f24c9461a9e053f2d2e090"`,
    );
    await queryRunner.query(`DROP TABLE "channel"`);
  }
}
