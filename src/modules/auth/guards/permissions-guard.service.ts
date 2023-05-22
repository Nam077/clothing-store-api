import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { user } = context.switchToHttp().getRequest();
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        const isHasPermission = permissions.some((permission) => user.permissions.includes(permission));
        if (!isHasPermission) {
            throw new ForbiddenException({ message: 'You do not have permission' });
        }
        return true;
    }
}
