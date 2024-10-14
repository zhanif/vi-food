import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
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
    const role = await this.getRole('customer');
    const user = this.userRepository.create({
      username: registerUserDto.username,
      password: this.generatePassword(registerUserDto.password),
      name: registerUserDto.name,
      phone: registerUserDto.phone,
      address: registerUserDto.address,
      role
    });
    return this.userRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    return this.register(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUserByPhone = await this.findByPhone(updateUserDto.phone);
    if (existingUserByPhone?.id !== +id) throw new ConflictException("Phone number is already registered");
    
    const existingUser = await this.findOne(id);
    const user = this.userRepository.merge(existingUser, updateUserDto);
    user.password = this.generatePassword(user.password);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const existingFood = await this.findOne(id);
    const result = await this.userRepository.softDelete(existingFood.id);
    if (result.affected == 0) throw new BadRequestException('Unable to delete user');
    return existingFood;
  }

  async findByUsername(username: string) {
    return await this.userRepository.createQueryBuilder('user')
      .withDeleted()
      .where('user.username = :username', { username })
      .leftJoinAndSelect('user.role', 'role')
      .getOne();
  }

  async findByPhone(phone: string) {
    return await this.userRepository.createQueryBuilder('user')
      .withDeleted()
      .where('user.phone = :phone', { phone })
      .getOne()
  }

  private async getRole(name: string) {
    const role = await this.roleRepository.findOneBy({ name });
    if (!role) throw new InternalServerErrorException();
    return role;
  }

  private generatePassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }
}
