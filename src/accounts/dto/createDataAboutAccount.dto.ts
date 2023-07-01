import { ApiProperty } from "@nestjs/swagger";

export class CreateDataAboutAccountDto {
    @ApiProperty({example: "Валерий", description: "Имя"})
    readonly name: string;
    @ApiProperty({example: "Лёвин", description: "Фамилия"})
    readonly surname: string;
    @ApiProperty({example: "21", description: "Возраст"})
    readonly age: number;
}