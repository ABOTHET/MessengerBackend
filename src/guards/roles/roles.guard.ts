import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { PayloadToken } from "../../refresh_tokens/payload/payload_token";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {

        const isPublic = this.reflector.get<boolean>('public', context.getHandler());

        if (isPublic) {
            return true;
        }

        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        if (!roles) {
            return true;
        }
        const token: PayloadToken = context.getArgByIndex(0).tokenAccess;
        if (!token.roles.some(role => roles.includes(role))) {
            throw new HttpException("У вас нет прав...", HttpStatus.BAD_REQUEST);
        }
        return true;
    }

}
