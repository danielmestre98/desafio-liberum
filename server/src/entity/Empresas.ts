import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Empresas {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    razaoSocial: string

    @Column({unique: true})
    cnpj: string

    @Column({type: "date"})
    dataRegistro: Date

    @Column({default: 1})
    status: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}
