import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AnswerService } from "./answers.service";
import { AnswersDto } from "./dtos";
import { CheckRolesGuard } from "src/guards/check.role.guard";
import { CheckToken } from "src/guards/check.token.guard";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "src/enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@UseGuards(CheckToken,CheckRolesGuard)
@Controller('answers')
export class AnswerController {
    constructor(private service:AnswerService){}

    @ApiBearerAuth()
    @Get()
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async getAll(){
        return await this.service.getAll()
    }

    @ApiBearerAuth()
    @Post()
    @Protected(true)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async create(@Body() payload:AnswersDto){
        return await this.service.create(payload)
    }

    @ApiBearerAuth()
    @Patch(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async update(@Body() payload:AnswersDto,@Param('id',ParseIntPipe) id:number){
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
