import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const role = await this.roleRepository.findOneBy({ name: 'customer' });
    if (!role) throw new InternalServerErrorException;

    const user = this.userRepository.create({
      username: registerUserDto.username,
      password: bcrypt.hashSync(registerUserDto.password, 10),
      name: registerUserDto.name,
      phone: registerUserDto.phone,
      address: registerUserDto.address,
      role,
    })
    return this.userRepository.save(user);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['role'] })
    if (!user) throw new NotFoundException("Unable to find the user");

    return user;
  }
}
