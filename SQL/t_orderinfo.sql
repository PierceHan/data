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

 Date: 01/05/2019 16:51:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_orderinfo
-- ----------------------------
DROP TABLE IF EXISTS `t_orderinfo`;
CREATE TABLE `t_orderinfo`  (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hotel_id` char(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `son_hotel_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `house_type_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `checkin_time` datetime(0) NULL DEFAULT NULL,
  `leave_time` datetime(0) NULL DEFAULT NULL,
  `inter_night_volume` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` float(10, 2) NULL DEFAULT NULL,
  `comission` float(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_orderinfo
-- ----------------------------
INSERT INTO `t_orderinfo` VALUES ('2a157a4b04844ed1b2ffb35cf4328c11', 'string1232', 'stringewrwe', 'string222', '2019-05-01 10:47:24', '2019-05-01 10:47:24', 'string', 0.00, 0.00);
INSERT INTO `t_orderinfo` VALUES ('e0c8f00ba6a046a3a2e443fbf062b7c0', 'string', 'string', 'string', '2019-04-13 22:30:54', '2019-04-13 22:30:54', 'string', 0.00, 0.00);
INSERT INTO `t_orderinfo` VALUES ('orderuuid000001', 'uuidtest', 'uuidtest0011', '123', '2019-04-12 15:57:15', '2019-04-14 15:57:24', '2', 512.00, 204.80);

SET FOREIGN_KEY_CHECKS = 1;
