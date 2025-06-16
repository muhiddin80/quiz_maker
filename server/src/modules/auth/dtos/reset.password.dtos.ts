import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto{
    @ApiProperty({type:'string'})
    @MinLength(4)
    @MaxLength(12)
    password:string;
}