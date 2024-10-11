import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(25)
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
    phone: string;
}