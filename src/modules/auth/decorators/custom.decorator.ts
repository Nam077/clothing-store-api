import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { User } from '../../user/entities/user.entity';
import { JwtPayload } from '../strategies/jwt.strategy';

export const IsPublic = () => SetMetadata('isPublic', true);
export const Permission = (...permissions: string[]) => SetMetadata('permissions', permissions);

export const GetCurrentUser = createParamDecorator((data: string | undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest();
    if (!data) {
        console.log(request.user);
        return request.user;
    }
    return request.user && request.user[data];
});
export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    console.log('request.user', request.user);
    const user = request.user as JwtPayload;
    return user.id;
});
export const Public = () => SetMetadata('isPublic', true);
