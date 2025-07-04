import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
  import { ROLES_KEY } from 'src/decorator';
  import { UserRoles } from 'src/enum';
  
  @Injectable()
  export class CheckRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<
        Request & { role?: UserRoles; userId?: string }
      >();
      const roles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      console.log('check',request.role)
      console.log(roles)
  
      let userRole = request.role;
  
      if (!userRole || !roles.includes(userRole)) {
        throw new ForbiddenException('You are not allowed to do that!');
      }
  
      return true;
    }
  }
