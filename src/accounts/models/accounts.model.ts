import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { RefreshToken } from "../../refresh_tokens/models/refresh_tokens.model";
import { DataAboutAccount } from "../../data_about_accounts/models/data_about_accounts.model";

@Table({tableName: "accounts", updatedAt: false, createdAt: false, deletedAt: false})
export class Account extends Model<InferAttributes<Account, {omit: "id" | "refresh_token" | "data_about_account"}>, InferCreationAttributes<Account>> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number
    @Column({type: DataType.STRING(11), unique: true, allowNull: false})
    phone: string;
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    @HasOne(() => RefreshToken)
    refresh_token: RefreshToken;
    @HasOne(() => DataAboutAccount)
    data_about_account: DataAboutAccount;
}
