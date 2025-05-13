/*
  Warnings:

  - The values [PANDDING] on the enum `Pandding` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Pandding_new" AS ENUM ('PANDING', 'PROCESSING', 'FAILD', 'SUCCESS');
ALTER TABLE "Borrowing" ALTER COLUMN "pandding" DROP DEFAULT;
ALTER TABLE "Borrowing" ALTER COLUMN "pandding" TYPE "Pandding_new" USING ("pandding"::text::"Pandding_new");
ALTER TYPE "Pandding" RENAME TO "Pandding_old";
ALTER TYPE "Pandding_new" RENAME TO "Pandding";
DROP TYPE "Pandding_old";
ALTER TABLE "Borrowing" ALTER COLUMN "pandding" SET DEFAULT 'PANDING';
COMMIT;

-- AlterTable
ALTER TABLE "Borrowing" ALTER COLUMN "pandding" SET DEFAULT 'PANDING';
