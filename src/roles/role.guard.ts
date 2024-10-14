import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    if (!roles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!(user && user.role && roles.includes(user.role.name)))
      throw new ForbiddenException("You don't have access to this resource");

    return true;
  }
}
