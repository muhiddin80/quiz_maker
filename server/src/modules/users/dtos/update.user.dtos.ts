import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDtos {
    @IsString()
    @ApiProperty({type:'string',example:'someone'})
    username:string;

    @IsEmail()
    @ApiProperty({type:'string',example:'someone@gmail.com'})
    email:string;

    @ApiProperty({type:'string',example:'someone'})
    @IsString()
    @MinLength(4)
    @MaxLength(12)
    password:string;
}