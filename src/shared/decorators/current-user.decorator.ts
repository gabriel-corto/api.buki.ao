import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '@/modules/auth/domain/TokenService';

export const CurrentUser = createParamDecorator(
  (data: keyof TokenPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (data) {
      return user?.[data];
    }

    return user;
  },
);
