import { AutoIncrement, Column, DataType, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { DataAboutAccount } from "./dataAboutAccounts.model";
import { ApiProperty } from "@nestjs/swagger";
import { RefreshToken } from "../../auth/model/refreshTokens.model";
import { Post } from "../../posts/model/posts.model";

interface AccountCreationAttributes {
    phone: string;
    password: string;
}
@Table({tableName: "accounts", createdAt: false, deletedAt: false, updatedAt: false})
export class Account extends Model<Account, AccountCreationAttributes> {
    @ApiProperty({example: "1", description: "id аккаунта"})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;
    @ApiProperty({example: "1", description: "Телефон"})
    @Column({type: DataType.STRING, allowNull: false})
    phone: string;
    @ApiProperty({example: "hQe2C1", description: "Пароль"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example: {
            id: 1,
            idAccount: 1,
            name: "Валерий",
            surname: "Лёвин",
            age: 21
        }, description: "Данные аккаунта"})
    @HasOne(() => DataAboutAccount)
    dataAboutAccount: DataAboutAccount;
    @HasOne(() => RefreshToken)
    refreshToken: RefreshToken;
    @HasMany(() => Post)
    posts: Post[];
}