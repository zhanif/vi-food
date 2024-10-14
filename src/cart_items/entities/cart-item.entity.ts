import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from 'src/foods/entities/food.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Food, { cascade: true, onUpdate: 'CASCADE', onDelete: 'SET NULL' })
  food: Food;

  @Column()
  quantity: number;
}
