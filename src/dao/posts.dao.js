import { client } from "./index.js";
import { ObjectId } from "mongodb";

const posts = client.db('forum').collection('Posts');

const insertPost = async (post) => {
  const result = await posts.insertOne(post);
  return result;
}

const getAllPosts = async (sort = {last_reply_time:-1},page = {}) => {
  if(page && page.pageSize && page.pageCount && typeof(page.pageSize * page.pageCount) === 'number'){
    const result = await posts.find().sort(sort).skip((page.pageCount - 1) * page.pageSize).limit(page.pageSize)
    return result.toArray();
  }else{
    const result = await posts.find().sort(sort);
    return result.toArray();
  }
}

const getPostById = async (_id) => {
  const result = await posts.findOne({_id:_id});
  return result;
}

const getPostByUserId = async (user_id) => {
  const result = await posts.find({user_id:user_id});
  return result.toArray();
}

const getPostByPart = async (part,sort = {last_reply_time:-1},page = undefined) => {
  if(page && page.pageSize && page.pageCount && typeof(page.pageSize * page.pageCount) === 'number'){
    const result = await posts.find({part:part}).sort(sort).skip((page.pageCount - 1) * page.pageSize).limit(page.pageSize)
    return result.toArray();
  }else{
    const result = await posts.find({part:part}).sort(sort);
    return result.toArray();
  }
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
  const result = await posts.find({
    $or: [
      {title:{$regex: new RegExp(text,'i')}},
      {content:{$regex: new RegExp(text,'i')}}
    ]
  });
  return result.toArray();
}

export { insertPost,deletePost,getAllPosts,getPostById,getPostByUserId,getPostByPart,updatePost,searchPost }

//test
// console.log(await insertPost({title:'测试文章1',content:'这是测试文章1',post_time:'2023-10-4',last_reply_time: '2023-10-4',replys: [], replys_length: 0,user_id: '651d15a256840484daa97e2a',username:'test01',part: 'main'}))
// console.log(await getAllPosts({last_reply_time:-1},{pageSize:3,pageCount:2}))
// console.log(await getPostById(new ObjectId('651d5b97d18377d74bff8c34')))
// console.log(await getPostByUserId('test01'))
// console.log(await getPostByPart('main'))
// let post = await getPostById(new ObjectId('651d2f67921c16623cc76a59'))
// post.part = 'main'
// console.log(await updatePost(post))
// console.log(await deletePost(post))