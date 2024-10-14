import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { RoleGuard } from 'src/roles/role.guard';
import { Role } from 'src/roles/role.decorator';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @UseGuards(JwtGuard, RoleGuard)
  @Role('employee', 'admin')
  create(@Body() createFoodDto: CreateFoodDto) {
    return this.foodsService.create(createFoodDto);
  }

  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Role('employee', 'admin')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodsService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RoleGuard)
  @Role('employee', 'admin')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(+id);
  }
}
