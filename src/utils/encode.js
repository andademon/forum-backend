import crypro from 'crypto'
import bcrypt from 'bcrypt'

// 生成哈希密码
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // 盐的轮数，通常建议设置为 10 或更多
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// 验证密码
const comparePasswords = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

export { hashPassword, comparePasswords }

// const password = '12345678'

// const password2 = '12345677'

// const hashedPassword = await hashPassword(password)

// console.log(await comparePasswords(password,hashedPassword))

// console.log(await hashPassword(password))