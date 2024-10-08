/*
  Warnings:

  - The values [DELTED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('ON', 'DELETED', 'ALREALY', 'INALREALY', 'OFF');
ALTER TABLE "Borrowing" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Customer" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Equiment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Manager" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "test" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "test" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Customer" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Borrowing" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Manager" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Equiment" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Borrowing" ALTER COLUMN "status" SET DEFAULT 'ALREALY';
ALTER TABLE "Customer" ALTER COLUMN "status" SET DEFAULT 'ALREALY';
ALTER TABLE "Equiment" ALTER COLUMN "status" SET DEFAULT 'ALREALY';
ALTER TABLE "Manager" ALTER COLUMN "status" SET DEFAULT 'ALREALY';
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT 'ALREALY';
ALTER TABLE "test" ALTER COLUMN "status" SET DEFAULT 'ALREALY';
COMMIT;
