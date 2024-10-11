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
    private foodRepository: Repository<Food>,
  ) {}

  create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodRepository.find();
    return foods;
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) throw new NotFoundException(`Unable to find the specified food`);
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const existingFood = await this.findOne(id);
    const food = this.foodRepository.merge(existingFood, updateFoodDto);
    return await this.foodRepository.save(food);
  }

  async remove(id: number) {
    const existingFood = await this.findOne(id);
    const result = await this.foodRepository.softDelete(existingFood.id);
    if (result.affected == 0) throw new BadRequestException("Unable to delete the specified food");
    return existingFood;
  }
}
