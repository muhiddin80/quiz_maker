/*
  Warnings:

  - Added the required column `user_id` to the `quiz_collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz_collection" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "quizes" ADD COLUMN     "img_url" VARCHAR;

-- AddForeignKey
ALTER TABLE "quiz_collection" ADD CONSTRAINT "quiz_collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
