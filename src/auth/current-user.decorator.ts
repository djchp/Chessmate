import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentUser = createParamDecorator(
  (data: unknown, executionContext: ExecutionContext) => {
    return executionContext.switchToHttp().getRequest().user;
  },
);
