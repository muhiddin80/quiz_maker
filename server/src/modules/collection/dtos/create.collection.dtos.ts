import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @ApiProperty({type:'string',example:'something'})
    name:string;
}