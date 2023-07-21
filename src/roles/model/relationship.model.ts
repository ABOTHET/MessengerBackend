import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Role } from "./roles.model";
import { Account } from "../../accounts/models/accounts.model";

@Table({tableName: "relationships", updatedAt: false, createdAt: false, deletedAt: false})
export class Relationship extends Model<InferAttributes<Relationship, {omit: "id"}>, InferCreationAttributes<Relationship>> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number
    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER, allowNull: false})
    role_id: number;
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, allowNull: false})
    account_id: number;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

}
