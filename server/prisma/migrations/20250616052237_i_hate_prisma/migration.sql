/*
  Warnings:

  - You are about to drop the column `answerId` on the `answer_translation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[answer_id]` on the table `answer_translation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `answer_id` to the `answer_translation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "answer_translation" DROP CONSTRAINT "answer_translation_answerId_fkey";

-- DropIndex
DROP INDEX "answer_translation_answerId_key";

-- AlterTable
ALTER TABLE "answer_translation" DROP COLUMN "answerId",
ADD COLUMN     "answer_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "answer_translation_answer_id_key" ON "answer_translation"("answer_id");

-- AddForeignKey
ALTER TABLE "answer_translation" ADD CONSTRAINT "answer_translation_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
