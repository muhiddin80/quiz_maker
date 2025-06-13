import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports:[MailerModule.forRoot({transport:{
        service:'gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASSWORD
        }
    }})],
    controllers:[AuthController],
    providers:[AuthService,PrismaService]
})

export class AuthModule {}