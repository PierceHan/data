/*
 Navicat Premium Data Transfer

 Source Server         : 本地MySQL5.7
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : one

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 01/05/2019 16:51:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_hotelbasicinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_hotelbasicinfo`;
CREATE TABLE `t_hotelbasicinfo`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cbd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `star` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `rank` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_hotelbasicinfo
-- ----------------------------
INSERT INTO `t_hotelbasicinfo` VALUES ('518e4f2d194c4e4f92a6ec4adf900319', 'wsc', '北京', '万达1', '4', '4');
INSERT INTO `t_hotelbasicinfo` VALUES ('d2fa6e2f835c4244bb05d06375326c06', 'zjp001', '上海', '龙之梦001', '4', '3');
INSERT INTO `t_hotelbasicinfo` VALUES ('uuidtest', '如家0000111', '上海', '龙之梦', '4', '5');

SET FOREIGN_KEY_CHECKS = 1;
