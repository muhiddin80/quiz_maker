import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import * as bcrypt from "bcryptjs"
import { LoginDto, RegisterDto } from "./dtos";
import { ForgotPasswordDto } from "./dtos/forgot.password.dtos";
import * as crypto  from "node:crypto"
import { MailerService } from "@nestjs-modules/mailer";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private prisma:PrismaService,private MailService:MailerService,private JwtService:JwtService){}

    async register(payload:RegisterDto){
        const founded = await this.prisma.user.findUnique({where:{email:payload.email}})
        if(founded){
            throw new BadRequestException('This email is already registered!')
        }
        const hashPassword = bcrypt.hashSync(payload.password)

        const user  = await this.prisma.user.create({data:{username:payload.username,
                            email:payload.email,
                            password:hashPassword
        }})

        await this.MailService.sendMail({
            to:payload.email,
            subject:"Welcome customer!",
            html:`<body style="font-family:Arial,sans-serif; font-size:14px; color:#333; background:#fff; padding:20px; margin:0;">
            <p style="margin:0 0 10px;">Hi <strong>${payload.username}</strong>,</p>
            <p style="margin:0 0 10px;">Welcome to our app! We're glad to have you here.</p>
            <p style="margin:0 0 10px;">If you need any help, feel free to contact us anytime.</p>
            <p style="margin:20px 0 0; font-size:12px; color:#888;">– The Team</p>
          </body>`
        })

        const token = await this.JwtService.signAsync({id:user.id,role:user.role},{secret:process.env.ACCESS_TOKEN_SECRET})

        return {
            return:token,
            message:"Successfully registered!",
            data:user
        }
    }

    async login(payload:LoginDto){
        const founded = await this.prisma.user.findUnique({where:{email:payload.email}})
        if(!founded){
            throw new BadRequestException('You are not registered!')
        }

        if(founded.password){
            const isMatch = bcrypt.compareSync(payload.password,founded.password)
            if(!isMatch){
                throw new BadRequestException('Invalid password!')
            }
        }
        const token = await this.JwtService.signAsync({id:founded.id,role:founded.role},{secret:process.env.ACCESS_TOKEN_SECRET})
        return {
            token:token,
            message:"Successfully logged!",
            data:founded
        }
    }

    async forgotPassword(payload:ForgotPasswordDto){
        const {email} = payload;

        const user = await this.prisma.user.findUnique({where:{email}})

        if(!user){
            throw new BadRequestException("This user does not exists!")
        }
        let token = crypto.randomBytes(50)
        const new_token = token.toString('hex')
        await this.prisma.user.update({where:{email},data:{token:new_token}})

        await this.MailService.sendMail({
            to: email,
            subject: 'Reset password!',
            html: `
              <h2>Reset your password with this link:</h2>
              <h4>${new_token}</h4>
              <a href="http://localhost:1234/pages/reset.password.html?token=${new_token}">
                Reset Password
              </a>
            `,
          });
          

        return "We send url to your email!"
    }

    async resetPassword(password:string,token:string){
        const founded = await this.prisma.user.findFirst({where:{token}})
        if(!founded){
            throw new BadRequestException("Invalid token!")
        }
        const passwordHash = bcrypt.hashSync(password)

        await this.prisma.user.update({where:{email:founded.email},data:{password:passwordHash}})
        return 'Password successfully reseted!'
    }

    async registerByGoogle(email:string,username:string){
        const founded = await this.prisma.user.findUnique({where:{email}})
        if(founded){
            throw new BadRequestException('This email is already registered!')
        }

        
        const user  = await this.prisma.user.create({data:{username:username,
            email:email,
        }})

        await this.MailService.sendMail({
            to:email,
            subject:"Welcome customer!",
            html:`<body style="font-family:Arial,sans-serif; font-size:14px; color:#333; background:#fff; padding:20px; margin:0;">
            <p style="margin:0 0 10px;">Hi <strong>${username}</strong>,</p>
            <p style="margin:0 0 10px;">Welcome to our app! We're glad to have you here.</p>
            <p style="margin:0 0 10px;">If you need any help, feel free to contact us anytime.</p>
            <p style="margin:20px 0 0; font-size:12px; color:#888;">– The Team</p>
            </body>`
        })

        const token = await this.JwtService.signAsync({id:user.id,role:user.role},{secret:process.env.ACCESS_TOKEN_SECRET})

        return {
            return:token,
            message:"Successfully registered!",
            data:user
            }
    }

    async loginByGoogle(email:string){
        const founded = await this.prisma.user.findUnique({where:{email:email}})
        if(!founded){
            throw new BadRequestException('You are not registered!')
        }

        const token = await this.JwtService.signAsync({id:founded.id,role:founded.role},{secret:process.env.ACCESS_TOKEN_SECRET})
        return {
            token:token,
            message:"Successfully logged!",
            data:founded
        }
    }

    async findUserByEmail(email:string){
        const founded = await this.prisma.user.findUnique({where:{email:email}})
        return founded
    }
}