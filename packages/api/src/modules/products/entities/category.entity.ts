import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ nullable: true, type: 'text' })
  description?: string

  @Column({ name: 'icon_url', nullable: true })
  iconUrl?: string

  @Column({ name: 'banner_url', nullable: true })
  bannerUrl?: string

  @Column({ name: 'parent_id', nullable: true })
  parentId?: string

  @ManyToOne(() => Category, (c) => c.children, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent?: Category

  @OneToMany(() => Category, (c) => c.parent)
  children: Category[]

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
