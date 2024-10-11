import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor (
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}
    
    async login(loginUserDto: LoginUserDto) {
        const user = await this.usersService.findByUsername(loginUserDto.username);
        if (!user || !user.validatePassword(loginUserDto.password)) throw new BadRequestException("User not found");

        const access_token = await this.getPayload(user)
        return {
            user: user,
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
            access_token
        };
    }

    async getPayload(user: User) {
        const payload = { id: user.id, username: user.username, role_id: user.role.id }
        return this.jwtService.sign(payload)
    }
}
