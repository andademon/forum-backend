import { MongoClient } from "mongodb";

const main = () => {  
    const url = "mongodb://localhost:27017/";
    const client = new MongoClient(url);
    try {
        const forum = client.db('forum')
        console.log(forum)
        // forum.createCollection('User2').createIndex({ "password": 1 })
    } catch (error) {
        console.log(error);
    }
    // client.close()
}

main()

// db.getCollection("Users").drop();
// db.createCollection("Users");
// db.getCollection("Users").createIndex({
//     password: NumberInt("1")
// }, {
//     name: "password"
// });
// db.getCollection("Users").createIndex({
//     username: NumberInt("1")
// }, {
//     name: "username"
// });
// db.getCollection("Users").createIndex({
//     role: NumberInt("1")
// }, {
//     name: "role"
// });
// db.getCollection("Users").createIndex(
//     { "email": 1 },
//     { unique: true }
// );