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