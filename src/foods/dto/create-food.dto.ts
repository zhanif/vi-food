import { IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  stock: number;
}
