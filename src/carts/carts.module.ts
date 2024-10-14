import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { Cart } from './entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/cart_items/entities/cart-item.entity';
import { UsersModule } from 'src/users/users.module';
import { FoodsModule } from 'src/foods/foods.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem]), FoodsModule, UsersModule],
  controllers: [CartsController],
  providers: [CartsService]
})
export class CartsModule {}
