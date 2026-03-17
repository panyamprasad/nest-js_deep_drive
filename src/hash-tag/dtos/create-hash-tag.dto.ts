import { IsNotEmpty, IsString } from 'class-validator';
export class CreateHashTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
