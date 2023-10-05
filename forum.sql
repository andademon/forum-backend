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

 Date: 04/10/2023 21:47:11
*/


// ----------------------------
// Collection structure for Likes
// ----------------------------
db.getCollection("Likes").drop();
db.createCollection("Likes");
db.getCollection("Likes").createIndex({
    "user_id": NumberInt("1")
}, {
    name: "user_id"
});
db.getCollection("Likes").createIndex({
    "reply_id": NumberInt("1")
}, {
    name: "reply_id"
});
db.getCollection("Likes").createIndex({
    "like_time": NumberInt("1")
}, {
    name: "like_time"
});

// ----------------------------
// Collection structure for Posts
// ----------------------------
db.getCollection("Posts").drop();
db.createCollection("Posts");
db.getCollection("Posts").createIndex({
    "post_time": NumberInt("1")
}, {
    name: "post_time"
});
db.getCollection("Posts").createIndex({
    "last_reply_time": NumberInt("1")
}, {
    name: "last_reply_time"
});
db.getCollection("Posts").createIndex({
    replys: NumberInt("1")
}, {
    name: "replys"
});
db.getCollection("Posts").createIndex({
    "user_id": NumberInt("1")
}, {
    name: "user_id"
});
db.getCollection("Posts").createIndex({
    part: NumberInt("1")
}, {
    name: "part"
});

// ----------------------------
// Collection structure for Replys
// ----------------------------
db.getCollection("Replys").drop();
db.createCollection("Replys");
db.getCollection("Replys").createIndex({
    "user_id": NumberInt("1")
}, {
    name: "user_id"
});
db.getCollection("Replys").createIndex({
    "post_id": NumberInt("1")
}, {
    name: "post_id"
});
db.getCollection("Replys").createIndex({
    content: NumberInt("1")
}, {
    name: "content"
});
db.getCollection("Replys").createIndex({
    "reply_time": NumberInt("1")
}, {
    name: "reply_time"
});
db.getCollection("Replys").createIndex({
    likes: NumberInt("1")
}, {
    name: "likes"
});

// ----------------------------
// Collection structure for Users
// ----------------------------
db.getCollection("Users").drop();
db.createCollection("Users");
db.getCollection("Users").createIndex({
    password: NumberInt("1")
}, {
    name: "password"
});
db.getCollection("Users").createIndex({
    username: NumberInt("1")
}, {
    name: "username_1",
    unique: true
});
db.getCollection("Users").createIndex({
    role: NumberInt("1")
}, {
    name: "role"
});
db.getCollection("Users").createIndex({
    email: NumberInt("1")
}, {
    name: "email_1",
    unique: true
});
