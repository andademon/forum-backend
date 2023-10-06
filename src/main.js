import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken';
// import expressJWT from 'express-jwt'
import { ObjectId } from 'mongodb';
import * as UserDao from "./dao/users.dao.js";
import * as PostDao from "./dao/posts.dao.js";
import * as ReplyDao from "./dao/replys.dao.js";
import * as LikeDao from "./dao/likes.dao.js";
import { hashPassword,comparePasswords } from './utils/encode.js';
import { getCurrentTime } from './utils/getCurrentTime.js'

const secretKey = "test_^/]njuforum"

const app = new express();
const port = 3000;

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
// app.use(expressJWT({secret:secretKey}))
// app.use(expressJWT({ secret: secretKey }).unless({ path: ['/login','/signup','/user*'] }));

app.get('/users/email/:email', async (req,res) => {
  const email = req.param.email;
  const user = await UserDao.getUserByEmail(email);
  
  res.send(JSON.stringify(user));
})

app.get('/users/id/:id', async (req,res) => {
  const id = req.param.id;
  const user = await UserDao.getUserById(id);
  res.send(JSON.stringify(user));
})

app.get('/users', async (req,res) => {
  const users = await UserDao.getAllUser();
  res.send(JSON.stringify(users));
})

app.post('/users',(req,res) => {
  res.send("post /users")
})

function generateToken(_id){
  const token = jwt.sign({_id:_id},secretKey,{expiresIn:'2d'})
  return token;
}

app.post('/login',async (req,res) => {
  console.log(req.body)
  
  const data = req.body;
  //判空检查
  if(data.email && data.password){
    const user = await UserDao.getUserByEmail(data.email);
    //数据库检查
    if(user){
      //密码检查
      if(await comparePasswords(data.password,user.password)){
        //全部成功，生成jwt传递给前端
        const tokenStr = generateToken(user._id)
        res.send({status: 200, msg: "confirmed", token:tokenStr, user:{_id:user._id,username:user.username,email:user.email}})
        return
      }
    }
  }
  res.send({status: 400, msg: "Invalid login message"})
})

app.post('/signup',async (req,res) => {
  const data = req.body;
  console.log(data)
  if(data.username && data.email && data.password){
    if(await UserDao.getUserByEmail(data.email)){
      res.send({status:400,msg:"邮箱已注册"})
      return
    }else if(await UserDao.getUserByUsername(data.username)){
      res.send({status:400,msg:"用户名已被注册"})
      return
    }else{
      const rs = UserDao.insertUser({username:data.username,email:data.email,password:await hashPassword(data.password),role:"user"});
      rs.then(async () => {
        const user = await UserDao.getUserByEmail(data.email);
        const tokenStr = generateToken(user._id);
        res.send({status:200, msg: "add user successfully", token:tokenStr,user:{_id:user._id,username:user.username,email:user.email}})
      })
    }
  }
})



//
app.get('/posts', async (req,res) => {
  // console.log(req)
  const posts = await PostDao.getAllPosts();
  res.send(posts)
})

app.get('/postS/part/:part', async (req,res) => {
  const part = req.params.part;
  const posts = await PostDao.getPostByPart(part);
  res.send(posts)
})

app.get('/posts/:_id', async (req,res) => {
  const _id = req.params._id;
  const post = await PostDao.getPostById(new ObjectId(_id))
  res.send(post)
})

function authenticateToken(req, res, next) {
  const token = req.body.token;
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, secretKey, (err, parseData) => {
    if (err){
      console.log(err)
      return res.sendStatus(403)
    }
    req.body._id = parseData._id;
    next()
  })
}

app.post('/posts', authenticateToken ,async (req,res) => {
  const data = req.body;
  if(!data.title || !data.content){
    res.status(403).send({msg: "can't be null"})
    return
  }
  const user = await UserDao.getUserById(new ObjectId(data._id));
  const time = getCurrentTime();
  const post = {
    title: data.title,
    content: data.content,
    user_id: user._id,
    username: user.username,
    post_time: time,
    last_reply_time: time,
    replys: [],
    part: data.part,
  }
  const result = await PostDao.insertPost(post);
  if(result.acknowledged) res.status(200).send();
  else res.status(403).send();
})

app.post('/reply', authenticateToken, async (req,res) => {
  const data = req.body;
  if(!data.content){
    res.status(403).send();
    return
  }
  console.log(data)
  const user = await UserDao.getUserById(new ObjectId(data._id));
  const post = await PostDao.getPostById(new ObjectId(data.post_id));
  const reply = {
    user_id: user._id,
    username: user.username,
    post_id: post._id,
    content: data.content,
    reply_time: getCurrentTime(),
    likes: 0
  }
  post.replys.push(reply);
  const result1 = await PostDao.updatePost(post)
  const result2 = await ReplyDao.insertReply(reply);
  if(result1.acknowledged && result2.acknowledged){
    res.status(200).send();
    return
  }else{
    res.status(403).send();
    return
  }
})

// app.get('/reply/page/:page', async (req,res) => {
//   const page = req.params.page;
// })

// app.get('/posts/page/:page', async (req,res) => {
//   const page = req.
// })

// app.post('/like', authenticateToken, async (req,res) => {
//   const data = req.body;
//   const like = {
//     user_id: data._id,
//     reply_id: data.reply_id,
//     like_time:getCurrentTime(),
//   }
//   const reply = await ReplyDao.getReplyById(data.reply_id);
//   const post = await PostDao.getPostById(reply.post_id);
//   const likes = await LikeDao.getLikesgByReplyId(data.reply_id);
//   for(let i = 0;i < likes.length;i++){
//     if(data._id === likes[i]._id){
//       like = like[i];
//       const rs = await LikeDao.deleteLike(like);
//       reply.likes--;
//       const rs2 = await ReplyDao.updateReply(reply);
//       if(rs.acknowledged && rs2.acknowledged){
//         res.status(200).send();
//         return
//       }else{
//         res.status(403).send();
//         return
//       }
//     }
//   }

//   //TODO
//   const result = await LikeDao.insertLike(like);
//   if(result.acknowledged){
//     res.status(200).send();
//     return
//   }else{
//     res.status(403).send();
//     return
//   }
// })

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});