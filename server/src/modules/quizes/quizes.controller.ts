import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { QuizesService } from "./quizes.service";
import { CreateQuizDtos } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";
import { CheckFileSizePipe, CheckMimeTypePipe } from "src/pipes";

@Controller('quizes')
export class QuizesController {
    constructor(private service:QuizesService){}

    @Get()
    async getAll(){
        return await this.service.getAll()
    }

    @UseInterceptors(FileInterceptor('image'))
    @Post()
    @ApiConsumes('multipart/form-data')
    async create(@Body() payload:CreateQuizDtos,@UploadedFile(new CheckFileSizePipe(3000000),new CheckMimeTypePipe(['png','jpg'])) image:Express.Multer.File){
        return await this.service.create(payload,image)
    }

    @Patch(':id')
    async update(@Body() payload:CreateQuizDtos,@Param('id',ParseIntPipe) id:number){
        return await this.service.update(payload,id)
    }

    @Delete(':id')
    async remove(@Param('id',ParseIntPipe) id:number){
        return await this.service.remove(id)
    }
}