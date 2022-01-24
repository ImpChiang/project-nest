import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";

@Entity()
export class Articles{
  @PrimaryGeneratedColumn({type: 'int',name: 'article_id'})
  id: number;
  @Column({type: 'varchar',name: 'article_title'})
  title: string;
  @Column({type: 'text'})
  content: string;
  @Column({type: 'varchar'})
  abstract: string;
  @Column('tinyint', {
    default: () => 0,
    comment: '是否草稿，1 是 0 否'
  })
  isDraft: number;
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间'
  })
  createTime: number;
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间'
  })
  updateTime: number
}
