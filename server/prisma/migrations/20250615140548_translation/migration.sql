/*
  Warnings:

  - You are about to drop the `AnswerTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CorrectAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuizTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnswerTranslation" DROP CONSTRAINT "AnswerTranslation_answerId_fkey";

-- DropForeignKey
ALTER TABLE "AnswerTranslation" DROP CONSTRAINT "AnswerTranslation_languageCode_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "CorrectAnswer" DROP CONSTRAINT "CorrectAnswer_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "QuizTranslation" DROP CONSTRAINT "QuizTranslation_languageCode_fkey";

-- DropForeignKey
ALTER TABLE "QuizTranslation" DROP CONSTRAINT "QuizTranslation_quizId_fkey";

-- DropForeignKey
ALTER TABLE "Quizes" DROP CONSTRAINT "Quizes_collection_id_fkey";

-- DropTable
DROP TABLE "AnswerTranslation";

-- DropTable
DROP TABLE "Answers";

-- DropTable
DROP TABLE "CorrectAnswer";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "QuizTranslation";

-- DropTable
DROP TABLE "Quizes";

-- CreateTable
CREATE TABLE "language" (
    "code" VARCHAR NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "quizes" (
    "id" SERIAL NOT NULL,
    "img_url" VARCHAR,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "quizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_translation" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    "languageCode" TEXT NOT NULL,

    CONSTRAINT "quiz_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer_translation" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,
    "languageCode" TEXT NOT NULL,

    CONSTRAINT "answer_translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correct_answer" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,

    CONSTRAINT "correct_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_translation_quizId_key" ON "quiz_translation"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "answer_translation_answerId_key" ON "answer_translation"("answerId");

-- CreateIndex
CREATE UNIQUE INDEX "correct_answer_quiz_id_key" ON "correct_answer"("quiz_id");

-- AddForeignKey
ALTER TABLE "quizes" ADD CONSTRAINT "quizes_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "quiz_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_translation" ADD CONSTRAINT "quiz_translation_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_translation" ADD CONSTRAINT "quiz_translation_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_translation" ADD CONSTRAINT "answer_translation_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_translation" ADD CONSTRAINT "answer_translation_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "correct_answer" ADD CONSTRAINT "correct_answer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
