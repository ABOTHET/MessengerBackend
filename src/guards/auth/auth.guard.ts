import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { RefreshTokensService } from "../../refresh_tokens/refresh_tokens.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private refreshTokensService: RefreshTokensService) {}

  async canActivate(context: ExecutionContext){
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
