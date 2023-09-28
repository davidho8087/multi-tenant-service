import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  article_content: string;
}
