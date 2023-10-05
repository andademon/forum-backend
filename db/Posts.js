/*
 Navicat Premium Data Transfer

 Source Server         : MongoDB
 Source Server Type    : MongoDB
 Source Server Version : 70001
 Source Host           : localhost:27017
 Source Schema         : forum

 Target Server Type    : MongoDB
 Target Server Version : 70001
 File Encoding         : 65001

 Date: 04/10/2023 15:53:15
*/


// ----------------------------
// Collection structure for Posts
// ----------------------------
db.getCollection("Posts").drop();
db.createCollection("Posts");
db.getCollection("Posts").createIndex({
    title: NumberInt("1")
}, {
    name: "title"
});
db.getCollection("Posts").createIndex({
    content: NumberInt("1")
}, {
    name: "content"
});
db.getCollection("Posts").createIndex({
    post_time: NumberInt("1")
}, {
    name: "post_time"
});
db.getCollection("Posts").createIndex({
    last_reply_time: NumberInt("1")
}, {
    name: "last_reply_time"
});
db.getCollection("Posts").createIndex({
    replys: NumberInt("1")
}, {
    name: "replys"
});
db.getCollection("Posts").createIndex({
    user_id: NumberInt("1")
}, {
    name: "user_id"
});
db.getCollection("Posts").createIndex({
    username: NumberInt("1")
}, {
    name: "username"
});
db.getCollection("Posts").createIndex({
    part: NumberInt("1")
}, {
    name: "part"
});