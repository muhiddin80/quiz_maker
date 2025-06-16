import { Module } from "@nestjs/common";
import { CollectionController } from "./collection.controller";
import { CollectionService } from "./collection.service";
import { PrismaService } from "src/prisma";
import { JwtService } from "@nestjs/jwt";

@Module({
    controllers:[CollectionController],
    providers:[CollectionService,PrismaService,JwtService]
})

export class CollectionModule {}