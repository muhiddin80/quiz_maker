import { IsString } from "class-validator";
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDtos{
    @ApiProperty({type:'string'})
    @IsString()
    question:string;

    @ApiProperty({type:'integer'})
    @Type(()=>Number)
    collectionId:number;

    @ApiProperty({type:'string',format:'binary',required:false})
    image:Express.Multer.File
}