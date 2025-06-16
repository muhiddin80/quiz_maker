import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dtos";
import { CheckToken } from "src/guards/check.token.guard";
import { CheckRolesGuard } from "src/guards/check.role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "src/enum";

@UseGuards(CheckToken,CheckRolesGuard)
@Controller('collection')
export class CollectionController {
    constructor(private service:CollectionService){}

    @ApiBearerAuth()
    @Get()
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async getAll(){
        return await this.service.getAll()
    }

    @ApiBearerAuth()
    @Post()
    @Protected(false)
    @Roles([UserRoles.ADMIN,UserRoles.USER])
    async create(@Body() payload:CreateCollectionDto){
        return await this.service.create(payload)
    }

    @ApiBearerAuth()
    @Patch(':id')
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async update(@Body() payload:CreateCollectionDto,@Param('id',ParseIntPipe) id:number){
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