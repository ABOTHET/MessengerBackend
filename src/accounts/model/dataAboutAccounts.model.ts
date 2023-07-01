import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Account } from "./accounts.model";
import { ApiProperty } from "@nestjs/swagger";

interface DataAboutAccountCreationAttributes {
    idAccount: number;
    name: string;
    surname: string;
    age: number;
}
@Table({tableName: "data_about_accounts", createdAt: true, deletedAt: false, updatedAt: false})
export class DataAboutAccount extends Model<DataAboutAccount, DataAboutAccountCreationAttributes> {
    @ApiProperty({example: "1", description: "id данных, которыми аккаунт пользуется"})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;
    @ApiProperty({example: "1", description: "id аккаунта, к которому привязаны данные"})
    @ForeignKey(() => Account)
    @Column({type: DataType.INTEGER, allowNull: false})
    idAccount: number;
    @BelongsTo(() => Account)
    account: Account;
    @ApiProperty({example: "Валерий", description: "Имя"})
    @Column({type: DataType.STRING})
    name: string;
    @ApiProperty({example: "Лёвин", description: "Фамилия"})
    @Column({type: DataType.STRING})
    surname: string;
    @ApiProperty({example: "21", description: "Возраст"})
    @Column({type: DataType.SMALLINT})
    age: number;
}