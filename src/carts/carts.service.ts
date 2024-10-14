import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from 'src/cart_items/entities/cart-item.entity';
import { FoodsService } from 'src/foods/foods.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly foodService: FoodsService
  ) {}

  async addItem(userId: number, foodId: number, quantity: number) {
    const food = await this.foodService.findOne(foodId);
    if (!food) throw new NotFoundException('Food not found');

    let cart = await this.findByUserId(userId);
    if (!cart) cart = this.cartRepository.create({ user: { id: userId }, cartItems: [] });

    const existingItem = cart.cartItems.find((item) => item.food.id == foodId);
    if (existingItem) existingItem.quantity += quantity;
    else {
      const cartItem = new CartItem();
      cartItem.food = food;
      cartItem.quantity = quantity;

      cart.cartItems.push(cartItem);
    }

    return this.cartRepository.save(cart);
  }

  findByUserId(userId: number) {
    return this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['cartItems', 'cartItems.food']
    });
  }

  async removeItem(userId: number, foodId: number) {
    const cart = await this.findByUserId(userId);
    if (!cart) throw new NotFoundException('Cart not found');

    cart.cartItems = cart.cartItems.filter((item) => item.food.id != foodId);
    return this.cartRepository.save(cart);
  }

  async remove(userId: number) {
    const cart = await this.findByUserId(userId);
    if (!cart) throw new NotFoundException('Cart not found');

    return await this.cartRepository.remove(cart);
  }
}
