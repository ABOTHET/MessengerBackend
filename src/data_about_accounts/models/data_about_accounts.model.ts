import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Account } from "../../accounts/models/accounts.model";

@Table({tableName: "data_about_accounts", updatedAt: false, createdAt: true, deletedAt: false})
export class DataAboutAccount extends Model<InferAttributes<DataAboutAccount, {omit: "id" | "account"}>, InferCreationAttributes<DataAboutAccount>> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, allowNull: false})
    account_id: number;
    @Column({type: DataType.STRING})
    name: string;
    @Column({type: DataType.STRING})
    surname: string;
    @Column({type: DataType.STRING})
    age: string;
    @Column({type: DataType.STRING})
    city: string;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    @BelongsTo(() => Account)
    account: Account;
}
