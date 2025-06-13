import { Body, Controller, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos";
import { ForgotPasswordDto } from "./dtos/forgot.password.dtos";

@Controller('auth')
export class AuthController{
    constructor(private service:AuthService){}

    @Post('register')
    async register(@Body() payload:RegisterDto){
        return await this.service.register(payload)
    }

    @Post('login')
    async login(@Body() payload:LoginDto){
        return await this.service.login(payload)
    }

    @Post('forgot_password')
    async forgotPassword(@Body() payload:ForgotPasswordDto){
        return await this.service.forgotPassword(payload)
    }

    @Post('reset_password')
    async resetPassword(@Body('password') password:string,
        @Query('token') token:string){
            return await this.service.resetPassword(password,token)
        }
}