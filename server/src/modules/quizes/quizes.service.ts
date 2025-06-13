import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { CreateQuizDtos, UpdateQuizDtos } from "./dtos";
import { FsHelpers } from "src/helper";

@Injectable()
export class QuizesService{
    constructor(private prisma:PrismaService,
                private fs:FsHelpers
    ){}

    async getAll(){
        const quizes = await this.prisma.quizes.findMany()
        return {
            count:quizes.length,
            data:quizes
        }
    }

    async create(payload:CreateQuizDtos,image:Express.Multer.File){
        let imageName = ''
        if(image){
            imageName = await this.fs.uploadFile(image)
        }
        const quiz = await this.prisma.quizes.create({data:{
            imgUrl:imageName,
            question:payload.question,
            collectionId:payload.collectionId}
        })

        return {
            data:quiz
        }
    }

    async update(payload:UpdateQuizDtos,id:number){
        const founded = await this.prisma.quizes.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('Quiz not found!')
        }

        await this.prisma.quizes.update({data:{
            question:payload.question||founded.question,
            collectionId:payload.collectionId||founded.collectionId
        },
        where:{id}})

        return "Successfully updated!"
    }

    async remove(id:number){
        const founded = await this.prisma.quizes.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('Quiz not found!')
        } 

        await this.prisma.quizes.delete({where:{id}})

        return "Successfully deleted!"
    }
}