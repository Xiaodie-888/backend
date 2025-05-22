/*
Navicat MySQL Data Transfer

Source Server         : gbms
Source Server Version : 50726
Source Host           : localhost:3307
Source Database       : gbms

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2024-01-28 17:51:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for login_log
-- ----------------------------
DROP TABLE IF EXISTS `login_log`;
CREATE TABLE `login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_log
-- ----------------------------
INSERT INTO `login_log` VALUES ('1', '123666', '张三', null, '2024-01-22 09:15:05');
INSERT INTO `login_log` VALUES ('2', '123666', '张三', null, '2024-01-22 10:45:51');
INSERT INTO `login_log` VALUES ('3', '123666', '张三', null, '2024-01-23 13:20:42');
INSERT INTO `login_log` VALUES ('4', '123666', '张三', null, '2024-01-24 08:48:25');
INSERT INTO `login_log` VALUES ('5', '123666', '张三', null, '2024-01-24 16:00:50');
INSERT INTO `login_log` VALUES ('6', '123666', '张三', null, '2024-01-25 10:25:19');
INSERT INTO `login_log` VALUES ('7', '123666', '张三', null, '2024-01-28 15:05:31');
INSERT INTO `login_log` VALUES ('8', '123666', '张三', null, '2024-01-28 17:27:48');

-- ----------------------------
-- Table structure for operation_log
-- ----------------------------
DROP TABLE IF EXISTS `operation_log`;
CREATE TABLE `operation_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of operation_log
-- ----------------------------
INSERT INTO `operation_log` VALUES ('4', '123666', '张三', null, '2024-01-24 12:02:13', '成功', '中级');
INSERT INTO `operation_log` VALUES ('5', '123666', '张三', null, '2024-01-24 12:02:35', '成功', '中级');
INSERT INTO `operation_log` VALUES ('6', '123666', '张三', null, '2024-01-24 13:11:24', '成功', '中级');
INSERT INTO `operation_log` VALUES ('3', '123666', '张三', '苹果的库存减少了1', '2024-01-24 11:34:21', '成功', '中级');
INSERT INTO `operation_log` VALUES ('7', '123666', '张三', null, '2024-01-24 13:17:15', '成功', '中级');
INSERT INTO `operation_log` VALUES ('8', '123666', '张三', null, '2024-01-24 13:19:21', '成功', '中级');
INSERT INTO `operation_log` VALUES ('9', '123666', '张三', '橙子的库存减少了2', '2024-01-24 13:37:26', '成功', '中级');
INSERT INTO `operation_log` VALUES ('10', '123666', '张三', '删除了id为1002\n          的华为电脑1', '2024-01-24 14:23:23', '成功', '高级');
INSERT INTO `operation_log` VALUES ('11', '123666', '张三', '删除了id为1001\n          的华为手机', '2024-01-24 14:25:11', '成功', '高级');

-- ----------------------------
-- Table structure for out_product
-- ----------------------------
DROP TABLE IF EXISTS `out_product`;
CREATE TABLE `out_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_unit` varchar(255) DEFAULT NULL,
  `out_warehouse_number` int(11) DEFAULT NULL,
  `product_single_price` int(11) DEFAULT NULL,
  `apply_person` varchar(255) DEFAULT NULL,
  `audit_person` varchar(255) DEFAULT NULL,
  `apply_time` datetime DEFAULT NULL,
  `audit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of out_product
-- ----------------------------
INSERT INTO `out_product` VALUES ('1', '1002', '橙子', '个', null, '11', '张三', null, '2024-01-24 14:35:46', '2024-01-24 17:36:30');
INSERT INTO `out_product` VALUES ('2', '1002', '橙子', '个', null, '11', '张三', null, '2024-01-24 14:35:46', '2024-01-24 17:40:34');
INSERT INTO `out_product` VALUES ('3', '1002', '橙子', '个', null, '11', '张三', null, '2024-01-24 14:35:46', '2024-01-24 17:40:45');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_category` varchar(255) DEFAULT NULL,
  `product_unit` varchar(255) DEFAULT NULL,
  `product_single_price` int(11) DEFAULT NULL,
  `warehouse_number` int(11) DEFAULT NULL,
  `product_create_person` varchar(255) DEFAULT NULL,
  `product_create_time` datetime DEFAULT NULL,
  `product_update_time` datetime DEFAULT NULL,
  `product_out_number` int(11) DEFAULT NULL,
  `apply_person` varchar(255) DEFAULT NULL,
  `audit_person` varchar(255) DEFAULT NULL,
  `apply_time` datetime DEFAULT NULL,
  `audit_time` datetime DEFAULT NULL,
  `audit_status` varchar(255) DEFAULT NULL,
  `apply_notes` varchar(255) DEFAULT NULL,
  `audit_notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('17', '1001', '苹果', '食品类', '个', '1', '10', '张三', '2024-01-24 09:58:34', null, '1', '张三', null, '2024-01-24 13:45:39', null, '审核', '', null);
INSERT INTO `product` VALUES ('18', '1002', '橙子', '服装类', '个', '11', '10', '张三', '2024-01-24 11:41:58', '2024-01-24 13:37:26', '5', '张三', null, '2024-01-24 14:35:46', null, '审核', '', null);
INSERT INTO `product` VALUES ('20', '1000', '手机', '数码类', '其他', '1000', '1', '张三', '2024-01-24 11:46:51', null, null, null, null, null, null, '在库', null, null);
INSERT INTO `product` VALUES ('22', '1002', '苹果手机', '数码类', '其他', '1000', '1', '张三', '2024-01-24 11:47:16', null, null, null, null, null, null, '在库', null, null);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('131', '123456888', '$2b$2b$10$8el5gHyn4mjwJGdc4v53yOVG.eBza9jAp8Gxey1EoKhfibbfFVEzG', '张三', '男', '18', 'http://127.0.0.1:3007/upload/123456123.jpg', '123@163.com', '人事部', '经理', '2023-12-10 00:39:18', '2024-01-24 16:00:41', '0');
INSERT INTO `users` VALUES ('3', '12345678', '12345678', '王五', null, null, 'http://127.0.0.1:3007/upload/1001123.jpg', null, null, null, null, null, '0');
INSERT INTO `users` VALUES ('2', '1234567', '1234567', '李四', null, null, null, null, null, null, null, null, '0');
INSERT INTO `users` VALUES ('13', '123666', '$2b$10$UTTEvPoBYf524HDcQm2aA.zVI./k.QkvLwYBTaNorNiutLirG1kga', '张三', '男', null, 'http://127.0.0.1:3007/upload/1003123.jpg', null, null, null, '2024-01-14 15:37:30', '2024-01-18 14:28:46', '0');
INSERT INTO `users` VALUES ('14', '123789798', '$2b$10$TkaXzQRiPfVkPaundajgAuXtopInKtv76y6361irSXiaz6OnQXuDu', null, null, null, null, null, null, null, '2024-01-27 17:04:08', null, '0');
INSERT INTO `users` VALUES ('1', '123456', '$2b$10$ke4T7CyeHvfFvA.SuvlN9eNV0Vf1WZ8.jeIVvAvltVKE3O1V3cjSW', null, null, null, null, null, null, null, '2023-11-10 11:49:00', null, '0');
