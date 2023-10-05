import { client } from "./index.js";
// import { ObjectId } from 'mongodb';
// import { User } from "../module/user.js";


const users = client.db('forum').collection('Users');

const insertUser = async (user) => {
  const result = await users.insertOne(user);
  return result;
}

const getAllUser = async () => {
  const result = await users.find();
  return result.toArray();
}

const getUserById = async (_id) => {
  const result = await users.findOne({_id:_id});
  return result;
}

const getUserByEmail = async (email) => {
  const result = await users.findOne({email:email});
  return result;
}

const getUserByUsername = async (username) => {
  const result = await users.findOne({username:username});
  return result;
}

const updateUser = async (user) => {
  const result = await users.replaceOne({_id:user._id}, user);
  return result;
}

const deleteUser = async (user) => {
  const result = await users.deleteOne({_id: user._id});
  return result;
}

export { insertUser,getAllUser,getUserByEmail,getUserById,getUserByUsername,updateUser,deleteUser }

//test
// insertUser({email:"test003@gmail.com",password:"123456",username:"No.3",role:"user"})
// let user = await getUserByEmail("test003@gmail.com");
// user.role = "admin";
// console.log(user)
// updateUser(user)
// deleteUser(user)



// deleteUser(getUserByEmail("test003@gmail.com"));

// getUserById({email:""})

// console.log(await getAllUser())

// console.log(await getUserByEmail("test003@gmail.com"))

// await client.close()