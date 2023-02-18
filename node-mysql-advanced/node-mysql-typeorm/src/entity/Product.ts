import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Followes } from './Followes'
import { Person } from './Person'

// img , time , Card Title , text ,money , returntime
@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  img : string
  
  @Column()
  Card_Title : string

  @Column()
  text: string

  @Column()
  money: number

  @Column()
  returntime: Date

  
  @Column()
  time: Date

  @ManyToMany(() => Person)
    @JoinTable({
        name: 'product_person'
      })
    Person: Person[]

    @ManyToMany((type)=>Followes , (followes)=> Followes,{
      onDelete: 'CASCADE'
    })
    @JoinTable()
    followes: Followes[];
}
