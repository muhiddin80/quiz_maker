import { Type } from "class-transformer";
import { IsEnum, IsIn, IsOptional, IsPositive, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CollectionQuery {
    @ApiProperty({required:false,example:10})
    @Type(()=>Number)
    @IsPositive()
    @IsOptional()
    limit:number;

    @ApiProperty({required:false,example:1})
    @Type(()=>Number)
    @IsPositive()
    @IsOptional()
    page:number;

};