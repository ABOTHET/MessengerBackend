import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Account } from "../../accounts/models/accounts.model";

@Table({tableName: "posts", updatedAt: false, createdAt: true, deletedAt: false})
export class Post extends Model<InferAttributes<Post, {omit: "id" | "account"}>, InferCreationAttributes<Post>> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, allowNull: false})
    account_id: number;
    @Column({type: DataType.STRING})
    name: string;
    @Column({type: DataType.TEXT})
    description: string;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    @BelongsTo(() => Account)
    account: Account;
}
