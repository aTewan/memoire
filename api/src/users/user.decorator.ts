import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const DUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }
})