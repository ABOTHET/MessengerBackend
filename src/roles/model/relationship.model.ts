import { Column, Model, Table, DataType, HasOne, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { Account } from "../../accounts/model/accounts.model";
import { Role } from "./roles.model";

interface RelationshipAttributes {
    idAccount: number;
    idRole: number;
}

interface RelationshipCreationAttributes extends Optional<RelationshipAttributes, 'idAccount'> {}

@Table({tableName: "relationship", deletedAt: false, updatedAt: false, createdAt: false})
export class Relationship extends Model<RelationshipAttributes, RelationshipCreationAttributes> {
    @Column({autoIncrement: true, primaryKey: true, allowNull: false, type: DataType.INTEGER})
    id: number;
    @ForeignKey(() => Account)
    @Column({allowNull: false, type: DataType.INTEGER})
    idAccount: number;
    @ForeignKey(() => Role)
    @Column({allowNull: false, type: DataType.INTEGER})
    idRole: number;
    @BelongsTo(() => Account)
    account: Account;
    @BelongsTo(() => Role)
    role: Role;
}