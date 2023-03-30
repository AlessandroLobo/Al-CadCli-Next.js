/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cpf` on table `client` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `client_email_key` ON `client`;

-- AlterTable
ALTER TABLE `client` MODIFY `cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `client_cpf_key` ON `client`(`cpf`);
