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

const getPostByTitle = async (title) => {
  const result = await posts.find({title:title});
  return result.toArray();
}

const getPostByUserId = async (user_id) => {
  const result = await posts.findOne({user_id:user_id});
  return result;
}

const getPostByPart = async (part) => {
  const result = await posts.findOne({part:part});
  return result;
}

const updatePost = async (post) => {
  const result = await posts.replaceOne({_id:post._id}, post);
  return result;
}

const deletePost = async (post) => {
  const result = await posts.deleteOne({_id: post._id});
  return result;
}

export { insertPost,deletePost,getAllPosts,getPostById,getPostByUserId,getPostByPart,updatePost }

//test
// console.log(await insertPost({title:'测试文章3',content:'这是测试文章3',post_time:'2023-10-4',last_reply_time: '2023-10-4',replys: [{name:1},{name:2},{name:3}],user_id: 'test03',part: 'main'}))
// console.log(await getAllPosts())
// console.log(await getPostById(new ObjectId('651d5b97d18377d74bff8c34')))
// console.log(await getPostByUserId('test01'))
// console.log(await getPostByPart('main'))
// let post = await getPostById(new ObjectId('651d2f67921c16623cc76a59'))
// post.part = 'main'
// console.log(await updatePost(post))
// console.log(await deletePost(post))
