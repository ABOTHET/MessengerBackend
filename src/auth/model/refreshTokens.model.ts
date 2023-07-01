import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../accounts/model/accounts.model";

interface RefreshTokenCreationAttributes {
    idAccount: number;
    refreshToken: string;
}
@Table({tableName: "refresh_tokens", createdAt: false, deletedAt: false, updatedAt: false})
export class RefreshToken extends Model<RefreshToken, RefreshTokenCreationAttributes> {
    @ApiProperty({example: "1", description: "id токена, которым аккаунт пользуется"})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;
    @ApiProperty({example: "1", description: "id аккаунта, к которому привязаны данные"})
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, allowNull: false})
    idAccount: number;
    @BelongsTo(() => Account)
    account: Account;
    @ApiProperty({example: "ohgfierigiw.iquwuiwefuiewf.12iiowienhiuwef", description: "refresh_token"})
    @Column({type: DataType.TEXT})
    refreshToken: string;
}