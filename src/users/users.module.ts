import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { IsUniqueConstraint } from 'src/common/validators/unique.validator';
import { Cart } from 'src/carts/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Cart])],
  controllers: [UsersController],
  providers: [UsersService, IsUniqueConstraint],
  exports: [UsersService]
})
export class UsersModule {}
