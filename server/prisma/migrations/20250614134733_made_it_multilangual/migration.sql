/*
  Warnings:

  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CorrectAnswer" DROP CONSTRAINT "CorrectAnswer_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "answers" DROP CONSTRAINT "answers_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "quizes" DROP CONSTRAINT "quizes_collection_id_fkey";

-- DropTable
DROP TABLE "answers";

-- DropTable
DROP TABLE "quizes";

-- CreateTable
CREATE TABLE "Language" (
    "code" VARCHAR NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Quizes" (
    "id" SERIAL NOT NULL,
    "img_url" VARCHAR,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "Quizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizTranslation" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "quizId" INTEGER NOT NULL,
    "languageCode" TEXT NOT NULL,

    CONSTRAINT "QuizTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerTranslation" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "answerId" INTEGER NOT NULL,
    "languageCode" TEXT NOT NULL,

    CONSTRAINT "AnswerTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuizTranslation_quizId_languageCode_key" ON "QuizTranslation"("quizId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "AnswerTranslation_answerId_languageCode_key" ON "AnswerTranslation"("answerId", "languageCode");

-- AddForeignKey
ALTER TABLE "Quizes" ADD CONSTRAINT "Quizes_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "quiz_collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTranslation" ADD CONSTRAINT "QuizTranslation_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizTranslation" ADD CONSTRAINT "QuizTranslation_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerTranslation" ADD CONSTRAINT "AnswerTranslation_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerTranslation" ADD CONSTRAINT "AnswerTranslation_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES "Language"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
