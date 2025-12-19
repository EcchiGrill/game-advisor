import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: keyof User | undefined, context: ExecutionContext) => {
    const type = context.getType<string>();

    let user: User;

    if (type === 'graphql') {
      const executionContext = GqlExecutionContext.create(context);
      user = executionContext.getContext().req.user;
    } else {
      user = context.switchToHttp().getRequest().user;
    }

    return data ? user?.[data] : (user ?? null);
  }
);
