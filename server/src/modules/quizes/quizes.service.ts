import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { CreateQuizDtos, UpdateQuizDtos } from "./dtos";
import { FsHelpers } from "src/helper";
import { QuizQuery } from "./dtos/quizes.query.dtos";

@Injectable()
export class QuizesService{
    constructor(private prisma:PrismaService,
                private fs:FsHelpers
    ){}

    async getAll(query:QuizQuery){
        const offset = (query.page-1)*query.limit;
        const quizes = await this.prisma.quizes.findMany({include:{
            translations:true
        },take:query.limit,skip:offset})
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
            collectionId:Number(payload.collectionId)}
        })
        const value = typeof payload.value === 'string' ? JSON.parse(payload.value) : payload.value;
        console.log(value)
        for(let key of Object.keys(value)){
            await this.prisma.quizTranslation.create({data:{quizId:quiz.id,
                                                            languageCode:key,
                                                            question: value[key]
            }})
        }
        return {
            data:quiz
        }
    }

    async update(payload: UpdateQuizDtos, id: number) {
        const founded = await this.prisma.quizes.findUnique({
            where: { id },
            include: { translations: true },
        });
    
        if (!founded) {
            throw new BadRequestException('Quiz not found!');
        }
    
        if (payload.value) {
            const existingTranslations = founded.translations;
    
            for (const key of Object.keys(payload.value)) {
                const existing = existingTranslations.find(t => t.languageCode === key);
                if (existing) {
                    await this.prisma.quizTranslation.update({
                        data: {
                            quizId: founded.id,
                            languageCode: key,
                            question: payload.value[key],
                        },
                        where: { id: existing.id },
                    });
                } else {
                    await this.prisma.quizTranslation.create({
                        data: {
                            quizId: founded.id,
                            languageCode: key,
                            question: payload.value[key],
                        },
                    });
                }
            }
        }
    
        return 'Successfully updated!';
    }
    

    async remove(id:number){
        const founded = await this.prisma.quizes.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('Quiz not found!')
        } 
        await this.prisma.quizTranslation.deleteMany({where:{quizId:founded.id}})
        await this.prisma.quizes.delete({where:{id}})

        return "Successfully deleted!"
    }
}