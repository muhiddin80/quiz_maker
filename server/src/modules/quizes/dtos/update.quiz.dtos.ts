import { IsObject, IsString } from "class-validator";
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuizDtos{
    @ApiProperty({type:'string'})
    @IsString()
    question:string;

    @ApiProperty({type:'integer'})
    @Type(()=>Number)
    collectionId:number;

    @ApiProperty({
        example: {
          en: 'human',
          uz: 'odam',
          ru: 'человек'
        },
        description: 'Multilingual translations. Key is language code, value is the translation.',
      })
      @IsObject()
      value: Record<string, string>;  
}