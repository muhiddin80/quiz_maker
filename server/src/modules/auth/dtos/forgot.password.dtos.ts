import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ForgotPasswordDto{
    @ApiProperty({type:'string',example:'someone@gmail.com'})
    @IsEmail()
    email:string;
}