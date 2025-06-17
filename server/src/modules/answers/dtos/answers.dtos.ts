import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsPositive, IsString } from "class-validator";

export class AnswersDto{
    @ApiProperty({example:'something',type:'string'})
    @IsString()
    answer:string;

    @ApiProperty({example:0,type:'integer'})
    @IsPositive()
    @Type(()=>Number)
    quizId:number;

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