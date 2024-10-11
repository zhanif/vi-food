import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.usersService.register(registerUserDto);
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }
}
