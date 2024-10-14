import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from 'src/common/validators/unique.validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsUnique({ tableName: 'users', column: 'username' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @IsUnique({ tableName: 'users', column: 'phone' })
  phone: string;
}
