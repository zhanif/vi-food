import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { EntityManager } from 'typeorm';

interface IUnique {
  tableName: string;
  column: string;
}

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const { tableName, column } = args.constraints[0];
    const existingData = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder()
      .withDeleted()
      .where(`${column} = :value`, { value })
      .getExists();

    return !existingData;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} already exists`;
  }
}

export function IsUnique(property: IUnique, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsUniqueConstraint
    });
  };
}
