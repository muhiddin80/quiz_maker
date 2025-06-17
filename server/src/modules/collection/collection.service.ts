import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { CreateCollectionDto } from "./dtos";
import { CollectionQuery } from "./dtos/collection.query.dtos";

@Injectable()
export class CollectionService {
    constructor(private prisma:PrismaService){}

    async getAll(query:CollectionQuery){
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const offset = (page - 1) * limit;

        const collections = await this.prisma.quizCollection.findMany({take:limit||10,skip:offset})

        return {
            count:collections.length,
            data:collections,
            page:query.page,
            limit:query.limit
        }
    }

    async create(paylaod:CreateCollectionDto){
        const founded = await this.prisma.quizCollection.findFirst({where:{name:paylaod.name}})
        if(founded){
            throw new BadRequestException('Please choice another title!')
        }

        const collection = await this.prisma.quizCollection.create({data:{name:paylaod.name,
            userId:paylaod.userId
        }})

        return {
            data:collection
        }
    }

    async update(paylaod:CreateCollectionDto,id:number){
        const founded = await this.prisma.quizCollection.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('Collection not found!')
        }

        await this.prisma.quizCollection.update({data:{name:paylaod.name},where:{id}})
        return "Successfully updated!"
    }

    async remove(id:number){
        const founded = await this.prisma.quizCollection.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('Collection not found!')
        }

        await this.prisma.quizCollection.delete({where:{id}})
        return "Successfully deleted!"
    }
}