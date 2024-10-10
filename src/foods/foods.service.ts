import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private foodsRepository: Repository<Food>,
  ) {}

  create(createFoodDto: CreateFoodDto) {
    const food = this.foodsRepository.create(createFoodDto);
    return this.foodsRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodsRepository.find();
    return foods
  }

  async findOne(id: number) {
    const food = await this.foodsRepository.findOneBy({ id });
    if (!food) throw new NotFoundException(`Unable to find the specified food`);
    return food
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const existingFood = await this.findOne(id);
    const food = this.foodsRepository.merge(existingFood, updateFoodDto);
    return await this.foodsRepository.save(food);
  }

  async remove(id: number) {
    const existingFood = await this.findOne(id);
    const result = await this.foodsRepository.softDelete(existingFood.id)
    if (result.affected == 0) throw new BadRequestException("Unable to delete the specified food")
    return existingFood;
  }
}
