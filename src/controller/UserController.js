import jwt from 'jsonwebtoken'
import { hashPassword, comparePasswords } from '../utils/encode.js'
import { getAllUser } from '../../dal/dao/users.dao.js';

const userList = [];

class UserController {
  chechData(data){
    if(!data.email || !data.password) return false;
    if(!data.email instanceof String || !data.password instanceof String) return false;
    return true;
  }

  static async login(ctx){
    const data = ctx.request.body;
    if(!data.name || !data.password) {
      return ctx.body = {
        code: "0000",
        message: "请求参数不合法"
      }
    }
    const userList = await getAllUser();
    const user = userList.find(item => data.email === item.email)
    if(user){
      const result = await comparePasswords(data.password,item.password);
      if(result){
        const token = jwt.sign({name: result.name},'Gopal_token',{ expiresIn: 60 * 300 })
        return ctx.body = {
          code: "1111",
          message: "登录成功",
          data: {
            token
          }
        }
      }
    }
    return ctx.body = {
      code: "0001",
      message: "用户名或密码错误"
    }
  }
}

export default UserController