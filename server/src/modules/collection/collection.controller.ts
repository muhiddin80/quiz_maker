import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dtos";

@Controller('collection')
export class CollectionController {
    constructor(private service:CollectionService){}

    @Get()
    async getAll(){
        return await this.service.getAll()
    }

    @Post()
    async create(@Body() payload:CreateCollectionDto){
        return await this.service.create(payload)
    }

    @Patch(':id')
    async update(@Body() payload:CreateCollectionDto,@Param('id',ParseIntPipe) id:number){
        return await this.service.update(payload,id)
    }

    @Delete(':id')
    async remove(@Param('id',ParseIntPipe) id:number){
        return await this.service.remove(id)
    }
}