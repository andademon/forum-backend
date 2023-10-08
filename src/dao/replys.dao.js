import { client } from "./index.js";
import { ObjectId } from "mongodb";
// import * as PostDao from './posts.dao.js'

const replys = client.db('forum').collection('Replys');

const insertReply = async (reply) => {
  const result = await replys.insertOne(reply);
  return result;
}

const getAllReplys = async () => {
  const result = await replys.find();
  return result.toArray();
}

const getReplyById = async (_id) => {
  const result = await replys.findOne({_id:_id});
  return result;
}

const getReplysByPostId = async (post_id) => {
  const result = await replys.find({post_id:post_id})
  return result.toArray();
}

const getReplysByUserId = async (user_id) => {
  const result = await replys.find({user_id:user_id});
  return result.toArray();
}

const getReplysByUsername = async (username) => {
  const result = await replys.find({username:username}).sort({reply_time:-1});
  return result.toArray();
}

const updateReply = async (reply) => {
  const result = await replys.replaceOne({_id:reply._id}, reply);
  return result;
}

const deleteReply = async (reply) => {
  const result = await replys.deleteOne({_id: reply._id});
  return result;
}

export { insertReply,deleteReply,getAllReplys,getReplyById,getReplysByUsername,getReplysByPostId,getReplysByUserId,updateReply }

//test
// let reply = await getReplyById(new ObjectId('651d6637282e992ed26c3b9d'))
// console.log(await insertReply({user_id:new ObjectId('651d157856840484daa97e29'),post_id: new ObjectId('651d328e79b06345fedd9c49'),content: 'hi! test test test',reply_time: '2023/10/4',likes: 2}))

// console.log(await getAllReplys())
// console.log(await getReplysByPostId(new ObjectId('651d328e79b06345fedd9c49')))
// console.log(await getReplysByUserId(new ObjectId('651d157856840484daa97e29')))
// console.log(await updateReply(reply))
// console.log(await deleteReply(reply))

// const main = async () => {
//   const replys = await getAllReplys();
//   replys.forEach(async (reply) => {
//     const post = await PostDao.getPostById(new ObjectId(reply.post_id));
//     if(!post){
//       // deleteReply(reply)
//       console.log(post)
//     }else console.log(post)
//   })
// }
// main();