import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsPositive, IsString } from "class-validator";

export class AnswersDto{
    @ApiProperty({example:'something',type:'string'})
    @IsString()
    answer:string;

    @ApiProperty({example:0,type:'integer'})
    @IsPositive()
    @Type(()=>Number)
    quizId:number;
}