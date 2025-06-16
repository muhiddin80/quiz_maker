/*
  Warnings:

  - A unique constraint covering the columns `[quizId,languageCode]` on the table `quiz_translation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "quiz_translation_quizId_key";

-- CreateIndex
CREATE UNIQUE INDEX "quiz_translation_quizId_languageCode_key" ON "quiz_translation"("quizId", "languageCode");
