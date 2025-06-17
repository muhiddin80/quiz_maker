import { Type } from "class-transformer";
import { IsEnum, IsIn, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class QuizQuery {
    @ApiProperty({required:false,example:10})
    @Type(()=>Number)
    @IsPositive()
    limit:number;

    @ApiProperty({required:false,example:1})
    @Type(()=>Number)
    @IsPositive()
    page:number;

};