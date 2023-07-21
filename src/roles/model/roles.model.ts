import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Account } from "../../accounts/models/accounts.model";
import { Relationship } from "./relationship.model";

@Table({tableName: "roles", updatedAt: false, createdAt: false, deletedAt: false})
export class Role extends Model<InferAttributes<Role, {omit: "id" | "accounts"}>, InferCreationAttributes<Role>> {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id: number
    @Column({type: DataType.STRING, allowNull: false})
    role: string;
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    @BelongsToMany(() => Account, () => Relationship)
    accounts: Account[];

}
