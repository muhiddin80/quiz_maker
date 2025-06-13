import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { AnswersDto } from "./dtos";

@Injectable()
export class AnswerService{
    constructor(private prisma:PrismaService){}

    async getAll(){
        const answers = await this.prisma.answers.findMany()
        
        return {
            count:answers.length,
            data:answers
        }
    }

    async create(payload:AnswersDto){
        const answer = await this.prisma.answers.create({data:{answer:payload.answer,
            quizId:payload.quizId
        }})

        return {
            data:answer
        }
    }

    async update(payload:AnswersDto,id:number){
        const founded = await this.prisma.answers.findUnique({where:{id}})

        if(!founded){
            throw new NotFoundException('Answer not found!')
        }

        await this.prisma.answers.update({where:{id},data:{answer:payload.answer||founded.answer,
                quizId:payload.quizId||founded.quizId
        }})

        return "Successfully updated!"
    }

    async remove(id:number){
        const founded = await this.prisma.answers.findUnique({where:{id}})

        if(!founded){
            throw new NotFoundException('Answer not found!')
        }

        await this.prisma.answers.delete({where:{id}})

        return "Successfully deleted!"
    }
}