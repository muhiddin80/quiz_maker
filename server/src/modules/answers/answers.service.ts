import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { AnswersDto } from "./dtos";
import { ApiQuery } from "@nestjs/swagger";

@Injectable()
export class AnswerService{
    constructor(private prisma:PrismaService){}

    async getAll(){
        const answers = await this.prisma.answers.findMany({include:{translations:true}})
        
        return {
            count:answers.length,
            data:answers
        }
    }

    async create(payload:AnswersDto){
        const answer = await this.prisma.answers.create({data:{
            quizId:payload.quizId
        }})
        if(payload.value){
            for(let key of Object.keys(payload.value)){
                await this.prisma.answerTranslation.create({data:{answer:payload.value[key],
                                            languageCode:key,
                                            answerId:answer.id
                }})
            }
        }

        return {
            data:answer
        }
    }

    async update(payload:AnswersDto,id:number){
        const founded = await this.prisma.answers.findUnique({where:{id},include:{translations:true}})

        if(!founded){
            throw new NotFoundException('Answer not found!')
        }
        if(payload.value){
            const existingTranslations = founded.translations

            for(let key of Object.keys(payload.value)){
                const existing = existingTranslations.find(t=>t.languageCode=key)
                if(existing){
                    await this.prisma.answerTranslation.update({data:{answerId:founded.id,
                        languageCode:key,
                        answer:payload.value[key]
                    },where:{id:existing.id}})
                }
                else{
                    await this.prisma.answerTranslation.create({data:{answerId:founded.id,
                        languageCode:key,
                        answer:payload.value[key]
                    }})
                }
            }

        }

        await this.prisma.answers.update({where:{id},data:{
                quizId:payload.quizId||founded.quizId
        }})

        return "Successfully updated!"
    }

    async remove(id:number){
        const founded = await this.prisma.answers.findUnique({where:{id}})

        if(!founded){
            throw new NotFoundException('Answer not found!')
        }

        await this.prisma.answerTranslation.deleteMany({where:{answerId:id}})

        await this.prisma.answers.delete({where:{id}})

        return "Successfully deleted!"
    }
}