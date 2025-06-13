import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginDto{
    @ApiProperty({type:'string',example:'someone@gmail.com'})
    @IsEmail()
    email:string;

    @ApiProperty({type:'string',example:'someone'})
    @MinLength(4)
    @MaxLength(12)
    password:string;
}