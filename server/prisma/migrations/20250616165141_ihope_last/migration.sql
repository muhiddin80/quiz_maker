/*
  Warnings:

  - A unique constraint covering the columns `[answer_id,languageCode]` on the table `answer_translation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "answer_translation_answer_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "answer_translation_answer_id_languageCode_key" ON "answer_translation"("answer_id", "languageCode");
