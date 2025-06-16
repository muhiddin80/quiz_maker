import { IsObject, IsString } from "class-validator";
import { Transform, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDtos{
    @ApiProperty({type:'integer'})
    @Transform(({ value }) => Number(value))
    collectionId:number;

    @ApiProperty({type:'string',format:'binary',required:false})
    image:Express.Multer.File

    @ApiProperty({
        example: {
          en: 'human',
          uz: 'odam',
          ru: 'человек'
        },
        description: 'Multilingual translations. Key is language code, value is the translation.',
      })
      @Transform(({value})=>{
        try {
          return typeof value === 'string' ? JSON.parse(value):value
        } catch (error) {
          return value
        }
      })
      @IsObject()
      value: Record<string, string>;    
}