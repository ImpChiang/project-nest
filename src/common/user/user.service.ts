// 又称为 Provider， 是一系列服务、repo、工厂方法、helper 的总称，主要负责处理具体的业务，如数据库的增删改查、事务、并发等逻辑代码；
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize' // 引入 Sequelize 库
import sequelize from "../../database/sequelize";  // 引入 Sequelize 实例
import { makeSalt, encryptPassword } from "../../utils/cryptogram"; // 引入加密函数
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';
declare namespace Service {　　
  interface userData {
    code: number
    data?: Object
    msg: string
  }
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private usersRepository: Repository<user>
  ) {}
  /**
   * 查询是否有该用户
   * @param mobile 用户手机号
   */
  async findSon(mobile: number): Promise<any | undefined> {
    // const sql = `
    //   SELECT
    //     user_id id,account_name username, real_name realName, passwd password,
    //     passwd_salt salt, mobile, role
    //   FROM
    //     admin_user
    //   WHERE
    //     mobile = '${mobile}'
    // `;
    // try {
    //   const res = await sequelize.query(sql, {
    //     type: Sequelize.QueryTypes.SELECT, // 查询方式
    //     raw: true, // 是否使用数组组装的方式展示结果
    //     logging: false // 是否将 SQL 语句打印到控制台，默认为 true
    //   })
    //   const user = res[0];
    //   console.log(res,'findSon')
    //   if (user) {
    //     return {
    //       code: 200, // 返回状态码，可自定义
    //       data: {
    //         user
    //       },
    //       msg: 'Success'
    //     }
    //   } else {
    //     return {
    //       code: 201,
    //       msg: '找不到用户'
    //     }
    //   }
    // } catch (error) {
    //   return {
    //     code: 503,
    //     msg: `Service error: ${error}`,
    //   }
    // }
    try {
      const userList = await this.usersRepository.find({where: {mobile: `${mobile}`}})
      console.log(userList,'typeorm')
      const user = userList[0]
      if (user) {
        return {
          code: 200, // 返回状态码，可自定义
          data: {
            user
          },
          msg: 'Success'
        }
      } else {
        return {
          code: 201,
          msg: '找不到用户'
        }
      }
    } catch (error) {
        return {
          code: 503,
          msg: `Service error: ${error}`,
        }
    }
  }
  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致'
      }
    }
    const user = await this.findSon(mobile)
    if (user.code == 200) {
      return {
        code: 400,
        msg: '用户已存在,请登录',
      }
    }
    const salt = makeSalt() // 制作密码盐
    const hashPwd = encryptPassword(password,salt) // 加密密码
    const registerSql = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, role)
      VALUES
        ('${accountName}','${realName}','${hashPwd}','${salt}','${mobile}',1)
    `
    try{
      const AdminUser = new user()
      console.log(AdminUser,accountName,realName,hashPwd,mobile)
      AdminUser.username = accountName
      AdminUser.mobile = mobile
      AdminUser.realName = realName
      AdminUser.role = 1
      AdminUser.password = hashPwd
      AdminUser.salt = salt
      await this.usersRepository.save(AdminUser)
      // await sequelize.query(registerSql,{logging: false})
      return {
        code: 200,
        msg: 'Success'
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
  async findOne() :Promise<any> {
    return this.usersRepository.find({where: {account_name: 'java'}})
  }
}
