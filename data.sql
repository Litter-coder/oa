-- v1.0.0.0
CREATE DATABASE oa;
USE oa;

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu` (
  `MENU_ID` int(8) NOT NULL COMMENT '主键',
  `TITLE` varchar(32) NOT NULL COMMENT '菜单名，用于菜单层级显示与权限设置',
  `MENU_URL` varchar(128) DEFAULT NULL COMMENT '菜单url地址',
  `PID` int(8) DEFAULT NULL COMMENT '父级菜单ID',
  `ICON` varchar(128) DEFAULT NULL COMMENT '菜单图标地址',
  `ENABLED` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否显示菜单；0--不显示  1--显示',
  PRIMARY KEY (`MENU_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `ROLE_ID` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `ROLE_NAME` varchar(32) NOT NULL COMMENT '角色名称',
  `CREATOR` varchar(32) NOT NULL COMMENT '角色创建者',
  `UPDATE_TIME` datetime NOT NULL COMMENT '角色更新时间',
  `DESCRIPTION` varchar(128) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`ROLE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu` (
  `ROLE_ID` int(8) NOT NULL,
  `MENU_ID` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_user`;
CREATE TABLE `t_sys_user` (
  `USER_ID` int(8) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(32) NOT NULL COMMENT '登录名',
  `PASSWORD` varchar(128) NOT NULL COMMENT '加密密码',
  `ENTRYTIME` datetime NOT NULL COMMENT '入职时间',
  `ENABLED` tinyint(1) NOT NULL DEFAULT '1' COMMENT '账户是否有效,0-无效；1-有效',
  `ACCOUNTNONLOCKED` tinyint(1) NOT NULL DEFAULT '1' COMMENT '账户是否锁定;0-锁定；1-未锁定',
  `ORG_ID` int(8) DEFAULT NULL COMMENT '所属机构',
  `INITIALPSD` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否使用的初始化密码：0-否；1-是',
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8 COMMENT='登录用户表';

-- ----------------------------
-- Table structure for t_sys_user_attempts
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_user_attempts`;
CREATE TABLE `t_sys_user_attempts` (
  `USERNAME` varchar(32) NOT NULL,
  `ATTEMPTS` int(4) NOT NULL COMMENT '登录密码错误次数',
  `LAST_ERROR_TIME` datetime NOT NULL COMMENT '上一次错误时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='登录错误记录表';

ALTER TABLE t_menu ADD COLUMN `MENU_TYPE` TINYINT NOT NULL COMMENT '菜单类型：1--顶级菜单，无url；2--菜单列表功能链接；3--操作功能（增删改）';

ALTER TABLE `t_sys_user` ADD COLUMN `LOGIN_STATUS` TINYINT DEFAULT 0 COMMENT '登录状态:0-web离开；1-web在线；2-web忙碌;3-手机在线';

DROP TABLE IF EXISTS `t_user_info`;
CREATE TABLE `t_user_info` (
  `ID` int(8) NOT NULL,
  `NAME` varchar(16) NOT NULL COMMENT '姓名',
  `SEX` tinyint(1) NOT NULL DEFAULT '1' COMMENT '性别：0-女；1-男',
  `EMAIL` varchar(32) DEFAULT NULL COMMENT '邮箱',
  `TELPHONE` varchar(10) DEFAULT NULL COMMENT '电话号码',
  `MOBILEPHONE` varchar(11) NOT NULL COMMENT '手机号码',
  `BIRTHDAY` date DEFAULT NULL COMMENT '生日',
  `IMAGE` varchar(128) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `t_menu` VALUES (1000000, '个人办公', NULL, 1, NULL, NULL, 1);
INSERT INTO `t_menu` VALUES (1010000, '个人事务', NULL, 2, 1000000, NULL, 1);
INSERT INTO `t_menu` VALUES (1010100, '我的文件', NULL, 3, 1010000, NULL, 1);
INSERT INTO `t_menu` VALUES (1010101, '共享文件', NULL, 4, 1010100, NULL, 1);
INSERT INTO `t_menu` VALUES (1010102, '接收文件', NULL, 4, 1010100, NULL, 1);
INSERT INTO `t_menu` VALUES (1010103, '网络硬盘', NULL, 4, 1010100, NULL, 1);
INSERT INTO `t_menu` VALUES (1010200, '我的任务', NULL, 3, 1010000, NULL, 1);
INSERT INTO `t_menu` VALUES (1010201, '任务列表', NULL, 4, 1010200, NULL, 1);
INSERT INTO `t_menu` VALUES (1020000, '公共信息', NULL, 2, 1000000, NULL, 1);
INSERT INTO `t_menu` VALUES (2000000, 'CRM系统', NULL, 1, NULL, NULL, 1);
INSERT INTO `t_menu` VALUES (3000000, '人事管理', NULL, 1, NULL, NULL, 1);
INSERT INTO `t_menu` VALUES (4000000, '流程管理', NULL, 1, NULL, NULL, 1);
INSERT INTO `t_menu` VALUES (5000000, '报表分析', NULL, 1, NULL, NULL, 1);
INSERT INTO `t_menu` VALUES (6000000, '系统管理', NULL, 1, NULL, NULL, 1);


INSERT INTO `t_role_menu` VALUES (1, 1000000);
INSERT INTO `t_role_menu` VALUES (1, 1010000);
INSERT INTO `t_role_menu` VALUES (1, 1010100);
INSERT INTO `t_role_menu` VALUES (1, 1010101);
INSERT INTO `t_role_menu` VALUES (1, 1010102);
INSERT INTO `t_role_menu` VALUES (1, 1010103);
INSERT INTO `t_role_menu` VALUES (1, 1010200);
INSERT INTO `t_role_menu` VALUES (1, 1010201);
INSERT INTO `t_role_menu` VALUES (1, 1020000);
INSERT INTO `t_role_menu` VALUES (1, 6000000);
INSERT INTO `t_role_menu` VALUES (1, 2000000);
INSERT INTO `t_role_menu` VALUES (1, 3000000);
INSERT INTO `t_role_menu` VALUES (1, 4000000);
INSERT INTO `t_role_menu` VALUES (1, 5000000);
