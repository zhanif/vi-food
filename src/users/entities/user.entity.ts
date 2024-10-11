import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";

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

    @Column({ length: 30 })
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

    validatePassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}
