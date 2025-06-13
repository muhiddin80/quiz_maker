import { Module } from "@nestjs/common";
import { QuizesController } from "./quizes.controller";
import { QuizesService } from "./quizes.service";
import { PrismaService } from "src/prisma";
import { FsHelpers } from "src/helper";

@Module({
    controllers:[QuizesController],
    providers:[QuizesService,PrismaService,FsHelpers]
})

export class QuizesModule {}