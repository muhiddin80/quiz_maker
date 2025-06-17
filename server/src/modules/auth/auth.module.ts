import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma";
import { MailerModule } from "@nestjs-modules/mailer";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { GoogleStrategy } from "./strategy/google.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports:[PassportModule,ConfigModule.forRoot({isGlobal:true}),MailerModule.forRoot({transport:{
        service:'gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    }}),JwtModule.register({
        global:true,
        secret:process.env.ACCESS_TOKEN_SECRET,
        signOptions:{
            expiresIn:process.env.ACCESS_TOKEN_TIME ? parseInt(process.env.ACCESS_TOKEN_TIME):'1h '
        }
    })],
    controllers:[AuthController],
    providers:[AuthService,PrismaService,GoogleStrategy]
})

export class AuthModule {}