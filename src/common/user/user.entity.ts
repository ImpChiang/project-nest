import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
// 导出类名需要与数据库名一一对应
/**
 * @Entity装饰器，实现实体类的一个关键：
 @Column：表示数据库的字段；
 @PrimaryGeneratedColumn()：表示数据的自增主键字段；
 */
@Entity()
export class user {
  @PrimaryGeneratedColumn({type: 'int',name: 'user_id'})
  id: number;
  @Column({name: 'account_name'})
  username: string;
  @Column({name: 'real_name'})
  realName: string;
  @Column({type: 'varchar',length: 11})
  mobile: number;
  @Column()
  role: number;
  @Column({name: 'passwd'})
  password: string;
  @Column({name: 'passwd_salt'})
  salt: string
}
