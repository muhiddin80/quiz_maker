import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @ApiProperty({type:'string',example:'something'})
    name:string;

    @Type(()=>Number)
    @ApiProperty({type:'number',example:1})
    @IsNumber()
    userId:number
}