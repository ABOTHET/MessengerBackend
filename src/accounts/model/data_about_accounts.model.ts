import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { Account } from "./accounts.model";

interface DataAboutAccountAttributes {
    idAccount: number;
    name: string;
    surname: string;
    age: number;
}

interface DataAboutAccountCreationAttributes extends Optional<DataAboutAccountAttributes, 'idAccount'> {}

@Table({tableName: "data_about_accounts", deletedAt: false, updatedAt: false})
export class DataAboutAccount extends Model<DataAboutAccountAttributes, DataAboutAccountCreationAttributes> {
    @Column({autoIncrement: true, primaryKey: true, allowNull: false, type: DataType.INTEGER})
    id: number;
    @ForeignKey(() => Account)
    @Column({allowNull: false, type: DataType.INTEGER})
    idAccount: number;
    @Column({allowNull: false, type: DataType.STRING, defaultValue: "Неизвестно"})
    name: string;
    @Column({allowNull: false, type: DataType.STRING, defaultValue: "Неизвестно"})
    surname: string;
    @Column({allowNull: false, type: DataType.INTEGER, defaultValue: "18"})
    age: number;
    @BelongsTo(() => Account)
    account: Account;
}