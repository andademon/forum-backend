import { MongoClient } from 'mongodb';

const mongoURI = 'mongodb://localhost:27017';

const dbName = 'forum';

const collectionName = 'User2';

async function createDB(mongoURI,dbName,collectionName,index) {
  try {
    const client = await MongoClient.connect(mongoURI);

    const db = client.db(dbName);

    console.log(`成功连接到数据库: ${dbName}`);

    await db.createCollection(collectionName);

    console.log(`成功创建集合: ${collectionName}`);

    await db.collection(collectionName).createIndex(index);

    console.log(`成功创建索引: ${JSON.stringify(index)}`);

    client.close();
  } catch (error) {
    console.error('连接、创建数据库或集合时出现错误:', error);
  }
}


createDB();