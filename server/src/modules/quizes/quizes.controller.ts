import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { QuizesService } from "./quizes.service";
import { CreateQuizDtos, UpdateQuizDtos } from "./dtos";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { CheckFileSizePipe, CheckMimeTypePipe } from "src/pipes";
import { CheckRolesGuard } from "src/guards/check.role.guard";
import { CheckToken } from "src/guards/check.token.guard";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "src/enum";
import { QuizQuery } from "./dtos/quizes.query.dtos";

@UseGuards(CheckToken,CheckRolesGuard)
@Controller('quizes')
export class QuizesController {
    constructor(private service:QuizesService){}

    @ApiBearerAuth()
    @Get()
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async getAll(@Query() query:QuizQuery){
        return await this.service.getAll(query)
    }

    @ApiBearerAuth()
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Create a new quiz',
        schema: {
          type: 'object',
          properties: {
            collectionId: {
              type: 'integer',
              example: 1
            },
            value: {
              type: 'string',
              example: JSON.stringify({
                en: 'What is JavaScript?',
                uz: 'JavaScript nima?',
                ru: 'Что такое JavaScript?'
              })
            },
            image: {
              type: 'string',
              format: 'binary'
            }
          },
          required: ['collectionId', 'value']
        }
      })    
    async create(@Body() payload:any,@UploadedFile(new CheckFileSizePipe(3000000),new CheckMimeTypePipe(['png','jpg'])) image:Express.Multer.File){
        return await this.service.create(payload,image)
    }

    @ApiBearerAuth()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    @Patch(':id')
    async update(@Body() payload:UpdateQuizDtos,@Param('id',ParseIntPipe) id:number){
        return await this.service.update(payload,id)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async remove(@Param('id',ParseIntPipe) id:number){
        return await this.service.remove(id)
    }
}