import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { UserService } from "./users.service";
import { UpdateUserDtos } from "./dtos/update.user.dtos";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Protected, Roles } from "src/decorator";
import { UserRoles } from "src/enum";

@Controller('users')
export class UserController{
    constructor(private service:UserService){}

    @ApiBearerAuth()
    @Get()
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async getAll(){
        return await this.service.getAll()
    }

    @ApiBearerAuth()
    @Patch(":id")
    @Protected(true)
    @Roles([UserRoles.ADMIN])
    async update(@Body() payload:UpdateUserDtos,@Param('id',ParseIntPipe) id:number){
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