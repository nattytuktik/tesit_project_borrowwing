-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ON', 'OFF');

-- CreateEnum
CREATE TYPE "Pandding" AS ENUM ('PANDDING', 'FAILD', 'SUCCESS');

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ON',

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "tel" VARCHAR(10) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ON',

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Borrowing" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "manager_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ON',
    "pandding" "Pandding" NOT NULL DEFAULT 'PANDDING',

    CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "tel" VARCHAR(10) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ON',

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equiment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ON',

    CONSTRAINT "Equiment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "borrowing_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ON',

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("borrowing_id","equipment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manager_user_name_key" ON "Manager"("user_name");

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_borrowing_id_fkey" FOREIGN KEY ("borrowing_id") REFERENCES "Borrowing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "Equiment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
