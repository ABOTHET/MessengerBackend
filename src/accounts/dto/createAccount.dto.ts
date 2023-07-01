import { ApiProperty } from "@nestjs/swagger";

export class CreateAccountDto {
    @ApiProperty({example: "79625546127", description: "Телефон"})
    readonly phone: string;
    @ApiProperty({example: "1G2bc%fg", description: "Пароль"})
    readonly password: string;
}