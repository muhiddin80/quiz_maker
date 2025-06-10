import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { PrismaService } from "src/prisma";

@Module({
    controllers:[UserController],
    providers:[UserService,PrismaService]
})

export class UserModule {}