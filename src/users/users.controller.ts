import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.decorator';

@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Role('admin')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Role('admin')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @Role('admin')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @Role('admin')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Role('admin')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
