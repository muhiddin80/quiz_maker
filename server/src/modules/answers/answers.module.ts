import { Module } from "@nestjs/common";
import { AnswerController } from "./answers.controller";
import { AnswerService } from "./answers.service";
import { PrismaService } from "src/prisma";

@Module({
    controllers:[AnswerController],
    providers:[AnswerService,PrismaService]
})

export class AnswerModule {}