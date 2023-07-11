import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private authService: AuthService) {
    }
    async use(req, res: Response, next: NextFunction) {
        const bearer = req.headers.authorization?.split(" ")[0];
        const accessToken = req.headers.authorization?.split(" ")[1];
        if (bearer !== "Bearer" || !accessToken) {
            throw new UnauthorizedException("Вы не авторизованы");
        }
        const isValid = await this.authService.validateAccessToken(accessToken);
        if (!isValid) {
            throw new UnauthorizedException("Вы не авторизованы");
        }
        next();
    }
}
