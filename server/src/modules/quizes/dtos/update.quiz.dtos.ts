import { IsString } from "class-validator";
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuizDtos{
    @ApiProperty({type:'string'})
    @IsString()
    question:string;

    @ApiProperty({type:'integer'})
    @Type(()=>Number)
    collectionId:number;
}