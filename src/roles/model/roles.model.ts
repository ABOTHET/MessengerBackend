import { Column, Model, Table, DataType, HasOne, HasMany, BelongsTo } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { Relationship } from "./relationship.model";

interface RoleAttributes {
    role: string;
    description: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'role'> {}

@Table({tableName: "roles", deletedAt: false, updatedAt: false, createdAt: false})
export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    @Column({autoIncrement: true, primaryKey: true, allowNull: false, type: DataType.INTEGER})
    id: number;
    @Column({allowNull: false, type: DataType.STRING})
    role: string;
    @Column({allowNull: false, type: DataType.STRING})
    description: string;
    @HasMany(() => Relationship)
    relationship: Relationship[];
}