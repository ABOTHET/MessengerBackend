import { Column, Model, Table, DataType, HasOne, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Optional } from "sequelize";
import { Account } from "../../accounts/model/accounts.model";
import { Role } from "../../roles/model/roles.model";

interface FriendRequestAttributes {
    idAccount: number;
    idFriend: number;
}

interface FriendRequestCreationAttributes extends Optional<FriendRequestAttributes, "idAccount"> {
}

@Table({ tableName: "friend_requests", deletedAt: false, updatedAt: false, createdAt: false })
export class FriendRequest extends Model<FriendRequestAttributes, FriendRequestCreationAttributes> {
    @Column({ autoIncrement: true, primaryKey: true, allowNull: false, type: DataType.INTEGER })
    id: number;
    @ForeignKey(() => Account)
    @Column({ allowNull: false, type: DataType.INTEGER })
    idAccount: number;
    @ForeignKey(() => Account)
    @Column({ allowNull: false, type: DataType.INTEGER })
    idFriend: number;
    @BelongsTo(() => Account)
    account: Account;
    @BelongsTo(() => Account)
    friend: Role;
}