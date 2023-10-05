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

 Date: 04/10/2023 20:43:29
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
