import { Controller, Get, Post, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtGuard } from 'src/auth/jwt.guard';
import { RoleGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.decorator';

@UseGuards(JwtGuard, RoleGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @Role('customer')
  addItem(@Req() req: any, @Query('food_id') foodId: number, @Query('qty') quantity: number) {
    return this.cartsService.addItem(+req.user.id, foodId, quantity);
  }

  @Get()
  @Role('customer')
  findOne(@Req() req: any) {
    return this.cartsService.findByUserId(+req.user.id);
  }

  @Delete()
  @Role('customer')
  remove(@Req() req: any, @Query('food_id') foodId: number) {
    if (foodId) return this.cartsService.removeItem(+req.user.id, foodId);
    else return this.cartsService.remove(+req.user.id);
  }
}
