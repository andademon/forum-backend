import { MongoClient } from 'mongodb';

const main = async () => {
  const url = 'mongodb://localhost:27017/';
  const client = new MongoClient(url);
  try {
    const forum = client.db('forum');
    console.log('连接到forum');

    const user = await forum.createCollection('Users');
    if (user) {
      console.log('\n创建集合：Users');
      const password = await user.createIndex({password: 1},{name: 'password'});
      if(password) console.log('创建索引：password')
      const username = await user.createIndex({username: 1}, {name: "username_1",unique: true});
      if(username) console.log('创建索引：username');
      const role = await user.createIndex({role: 1}, {name: "role"})
      if(role) console.log('创建索引：role')
      const email = await user.createIndex({email: 1}, {name: "email_1",unique: true})
      if(email) console.log('创建索引：email')
    }

    const post = await forum.createCollection('Posts');
    if(post) {
      console.log('\n创建集合：Posts')
      const title = await post.createIndex({"$**": "text"}, {name: "title",weights: {title: 1},"default_language": "english","language_override": "language",textIndexVersion: 3})
      if(title) console.log('创建索引：title');
      const post_time = await post.createIndex({"post_time": 1}, {name: "post_time"});
      if(post_time) console.log('创建索引：post_time');
      const last_reply_time = await post.createIndex({"last_reply_time": 1}, {name: "last_reply_time"})
      if(last_reply_time) console.log('创建索引：last_reply_time');
      const replys = await post.createIndex({replys: 1}, {name: "replys"});
      if(replys) console.log('创建索引：replys');
      const user_id = await post.createIndex({"user_id": 1}, {name: "user_id"});
      if(user_id) console.log('创建索引：user_id');
      const username = await post.createIndex({username: 1}, {name: "username"});
      if(username) console.log('创建索引：username');
      const part = await post.createIndex({part: 1}, {name: "part"})
      if(part) console.log('创建索引：part');
      const content = await post.createIndex({"$**": 1}, {name: "content"})
      if(content) console.log('创建索引：content');
      const replys_length = await post.createIndex({"replys_length": 1}, {name: "replys_length"})
      if(replys_length) console.log('创建索引：replys_length');
    }

    const reply = await forum.createCollection('Replys');
    if(reply) {
      console.log('\n创建集合：Replys')
      const user_id = await reply.createIndex({"user_id": 1}, {name: "user_id"});
      if(user_id) console.log('创建索引：user_id');
      const username = await reply.createIndex({username: 1}, {name: "username"});
      if(username) console.log('创建索引：username');
      const post_id = await reply.createIndex({"post_id": 1}, {name: "post_id"});
      if(post_id) console.log('创建索引：post_id');
      const content = await reply.createIndex({"content": 1}, {name: "content"})
      if(content) console.log('创建索引：content');
      const reply_time = await reply.createIndex({"reply_time": 1}, {name: "reply_time"})
      if(reply_time) console.log('创建索引：reply_time');
      const likes = await reply.createIndex({likes: 1}, {name: "likes"})
      if(likes) console.log('创建索引：likes');
    }
  } catch (error) {
    console.log(error);
  }
  client.close();
};

main();
