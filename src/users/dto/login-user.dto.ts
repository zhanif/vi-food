import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  password: string;
}
