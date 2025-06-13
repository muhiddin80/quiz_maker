import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { AnswerService } from "./answers.service";
import { AnswersDto } from "./dtos";

@Controller('answers')
export class AnswerController {
    constructor(private service:AnswerService){}

    @Get()
    async getAll(){
        return await this.service.getAll()
    }

    @Post()
    async create(@Body() payload:AnswersDto){
        return await this.service.create(payload)
    }

    @Patch(':id')
    async update(@Body() payload:AnswersDto,@Param('id',ParseIntPipe) id:number){
        return await this.service.update(payload,id)
    }

    @Delete(':id')
    async remove(@Param('id',ParseIntPipe) id:number){
        return await this.service.remove(id)
    }
}
