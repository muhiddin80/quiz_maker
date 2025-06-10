import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { UpdateUserDtos } from "./dtos/update.user.dtos";

@Injectable()
export class UserService{
    constructor(private prisma:PrismaService){}

    async getAll(){
        const users = await this.prisma.user.findMany()
        return {
            count: users.length,
            data:users
        }
    }

    async update(payload:UpdateUserDtos,id:number){
        const founded = await this.prisma.user.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('User not found!')
        }

        await this.prisma.user.update({where:{id},data:{
                    username:payload.username||founded.username,
                    email:payload.email||founded.email,
                    password:payload.password||founded.password
        }})

        return "Successfully updated!"
    }

    async remove(id:number){
        const founded = await this.prisma.user.findUnique({where:{id}})
        if(!founded){
            throw new BadRequestException('User not found!')
        }


        await this.prisma.user.delete({where:{id}})
        return "Successfully deleted!"
    }
}