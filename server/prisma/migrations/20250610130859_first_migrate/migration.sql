-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_collection" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "quiz_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizes" (
    "id" SERIAL NOT NULL,
    "quizes" VARCHAR NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "quizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "answer" VARCHAR NOT NULL,
    "quiz_id" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrectAnswer" (
    "id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,

    CONSTRAINT "CorrectAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CorrectAnswer_quiz_id_key" ON "CorrectAnswer"("quiz_id");

-- AddForeignKey
ALTER TABLE "quizes" ADD CONSTRAINT "quizes_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "quiz_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CorrectAnswer" ADD CONSTRAINT "CorrectAnswer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
