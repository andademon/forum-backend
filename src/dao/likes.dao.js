import { client } from "./index.js";
import { ObjectId } from "mongodb";

const likes = client.db('forum').collection('Likes');

const insertLike = async (like) => {
  const result = await likes.insertOne(like);
  return result;
}

const getLikeById = async (_id) => {
  const result = await likes.findOne({_id:_id});
  return result;
}

const getLikesgByReplyId = async (reply_id) => {
  const result = await likes.find({reply_id:reply_id})
  return result.toArray();
}

const getLikesByUserId = async (user_id) => {
  const result = await likes.find({user_id:user_id});
  return result.toArray();
}

const deleteLike = async (like) => {
  const result = await likes.deleteOne({_id: like._id});
  return result;
}

export { insertLike,deleteLike,getLikeById,getLikesgByReplyId,getLikesByUserId }