/*
  Warnings:

  - Added the required column `name` to the `quiz_collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz_collection" ADD COLUMN     "name" VARCHAR NOT NULL;
