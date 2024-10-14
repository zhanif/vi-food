import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  name: string;

  @Column({ length: 30, unique: true })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude({ toPlainOnly: true })
  deleted_at: Date;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToOne(() => Cart, (cart) => cart.user)
  @Exclude({ toPlainOnly: true })
  cart: Cart;

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
