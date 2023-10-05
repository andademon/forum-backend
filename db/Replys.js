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

 Date: 04/10/2023 16:00:56
*/


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
    "content": NumberInt("1")
}, {
    name: "content"
});
db.getCollection("Replys").createIndex({
    "reply_time": NumberInt("1")
}, {
    name: "reply_time"
});
db.getCollection("Replys").createIndex({
    "likes": NumberInt("1")
}, {
    name: "likes"
});
