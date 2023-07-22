import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { RefreshTokensService } from "../../refresh_tokens/refresh_tokens.service";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private refreshTokensService: RefreshTokensService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext){

    const isPublic = this.reflector.get<boolean>('public', context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Вы не авторизованы");
    }
    const valid = await this.refreshTokensService.validateAccessToken(token);
    if (!valid) {
      throw new UnauthorizedException("Вы не авторизованы");
    }
    request.tokenAccess = valid;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-ignore
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
