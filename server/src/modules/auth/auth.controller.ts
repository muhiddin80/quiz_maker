import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dtos";
import { ForgotPasswordDto } from "./dtos/forgot.password.dtos";
import { ApiBody, ApiExcludeEndpoint, ApiExpectationFailedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController{
    constructor(private service:AuthService){}

    @Get('/google')
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('google'))
    async google(){}

    @Get('/google/callback')
    @ApiExcludeEndpoint()
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req:any){
        const {email,firstName} = req.user

        const user = await this.service.findUserByEmail(email)
        if(user){
          return await this.service.loginByGoogle(email)
        }
        else{
          return await this.service.registerByGoogle(email,firstName)
        }
    }

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
    @ApiBody({description: 'Create a new quiz',
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string'
            },
          },
          required: ['password']
        }})
    async resetPassword(@Body('password') password:string,
        @Query('token') token:string){
            return await this.service.resetPassword(password,token)
        }
}