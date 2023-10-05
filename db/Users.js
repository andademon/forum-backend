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

 Date: 04/10/2023 15:30:05
*/


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
