import { client } from "./index.js";
import { ObjectId } from "mongodb";

const posts = client.db('forum').collection('Posts');

const insertPost = async (post) => {
  const result = await posts.insertOne(post);
  return result;
}

const getAllPosts = async () => {
  const result = await posts.find();
  return result.toArray();
}

const getPostById = async (_id) => {
  const result = await posts.findOne({_id:_id});
  return result;
}

const getPostByUserId = async (user_id) => {
  const result = await posts.find({user_id:user_id});
  return result.toArray();
}

const getPostByPart = async (part) => {
  const result = await posts.find({part:part});
  return result.toArray();
}

const updatePost = async (post) => {
  const result = await posts.replaceOne({_id:post._id}, post);
  return result;
}

const deletePost = async (post) => {
  const result = await posts.deleteOne({_id: post._id});
  return result;
}

const searchPost = async (text) => {
  const result = await posts.find({"$text":{"$search":text}});
  return result.toArray();
}

export { insertPost,deletePost,getAllPosts,getPostById,getPostByUserId,getPostByPart,updatePost,searchPost }

//test
// console.log(await insertPost({title:'测试文章1',content:'这是测试文章1',post_time:'2023-10-4',last_reply_time: '2023-10-4',replys: [],user_id: '651d15a256840484daa97e2a',username:'test01',part: 'main'}))
// console.log(await getAllPosts())
// console.log(await getPostById(new ObjectId('651d5b97d18377d74bff8c34')))
// console.log(await getPostByUserId('test01'))
// console.log(await getPostByPart('main'))
// let post = await getPostById(new ObjectId('651d2f67921c16623cc76a59'))
// post.part = 'main'
// console.log(await updatePost(post))
// console.log(await deletePost(post))