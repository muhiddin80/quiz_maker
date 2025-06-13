import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
    @ApiProperty({type:'string',example:'someone'})
    @IsString()
    username:string;

    @ApiProperty({type:'string',example:'someone@gmail.com'})
    @IsEmail()
    email:string;

    @ApiProperty({type:'string',example:'someone'})
    @MinLength(4)
    @MaxLength(12)
    password:string;
}