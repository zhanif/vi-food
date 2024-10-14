import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto extends OmitType(CreateUserDto, ['username'] as const) {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  phone: string;
}
