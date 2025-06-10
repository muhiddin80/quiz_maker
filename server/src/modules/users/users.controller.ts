import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { UserService } from "./users.service";
import { UpdateUserDtos } from "./dtos/update.user.dtos";

@Controller('users')
export class UserController{
    constructor(private service:UserService){}

    @Get()
    async getAll(){
        return await this.service.getAll()
    }

    @Patch(":id")
    async update(@Body() payload:UpdateUserDtos,@Param('id',ParseIntPipe) id:number){
        return await this.service.update(payload,id)
    }

    @Delete(":id")
    async remove(@Param('id',ParseIntPipe) id:number){
        return await this.service.remove(id)
    }
}