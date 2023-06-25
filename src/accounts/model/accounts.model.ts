import { Column, Model, Table, DataType, HasOne, HasMany } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { DataAboutAccount } from "./data_about_accounts.model";
import { Relationship } from "../../roles/model/relationship.model";
import { FriendRequest } from "../../friend_requests/model/friend_requests.model";

interface AccountAttributes {
    phone: string;
    password: string;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'phone'> {}

@Table({tableName: "accounts", deletedAt: false, updatedAt: false, createdAt: false})
export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
    @Column({autoIncrement: true, primaryKey: true, allowNull: false, type: DataType.INTEGER})
    id: number;
    @Column({allowNull: false, unique: true, type: DataType.STRING})
    phone: string;
    @Column({allowNull: false, type: DataType.STRING})
    password: string;
    @HasOne(() => DataAboutAccount)
    dataAboutAccount: DataAboutAccount;
    @HasMany(() => Relationship)
    relationship: Relationship[];
    @HasMany(() => FriendRequest)
    friendRequests: FriendRequest[];
}