import {
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Account } from "../../accounts/model/accounts.model";

interface PostCreationAttributes {
    idAccount: string;
    name: string;
    description: string;
    photos: string[];
}
@Table({tableName: "posts", createdAt: true, deletedAt: false, updatedAt: false})
export class Post extends Model<Post, PostCreationAttributes> {
    @ApiProperty({example: "1", description: "id поста, которым аккаунт пользуется"})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;
    @ApiProperty({example: "1", description: "id аккаунта, к которому привязаны данные"})
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, allowNull: false})
    idAccount: number;
    @BelongsTo(() => Account)
    account: Account;
    @ApiProperty({example: "Лето", description: "Название поста"})
    @Column({type: DataType.STRING})
    name: string;
    @ApiProperty({example: "Ох это прекрасное лето, посмотрите какие фото я сделал...", description: "Описание поста"})
    @Column({type: DataType.TEXT})
    description: string;
    @ApiProperty({example: "Тут типо фото в виде пнг...", description: "Фото приложинные к посту"})
    @Column({type: DataType.ARRAY(DataType.STRING)})
    photos: string[];
}