/*
  Warnings:

  - A unique constraint covering the columns `[answerId]` on the table `AnswerTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quizId]` on the table `QuizTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AnswerTranslation_answerId_languageCode_key";

-- DropIndex
DROP INDEX "QuizTranslation_quizId_languageCode_key";

-- CreateIndex
CREATE UNIQUE INDEX "AnswerTranslation_answerId_key" ON "AnswerTranslation"("answerId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizTranslation_quizId_key" ON "QuizTranslation"("quizId");
