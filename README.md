## mysql 是一个软件

1.在目录下新建 data目录，新建my.ini 文件
2.在 my.ini 中 写入
	[mysqld]
	basedir = D:/mysql-5.7.24
	datadir = D:/mysql-5.7.24/data

3.在cmd中执行D:\mysql-5.7.24\bin\msqld.exe --initialize-insecure   初始化数据库

4.配置环境变量D:\mysql-5.7.24\bin\

5.运行mysqld  打开数据库，运行 netstat -ano 可查看其其端口号为3306

6.连接数据库  mysql  -uroot -p        原密码为空

7.展示数据库，mysql> show databases;

8.更改数据库密码  C:\Users\10468>mysqladmin -uroot  -p123456 password 112233

9.停止mysql  :        mysqladmin -uroot -p  shutdown

10.ERROR 2003 (HY000): Can't connect to MySQL server on 'localhost' (10061)   mysql没有启动

### 踩过的坑
使用 mysql -uroot  -p 的时候，在win7中需要输入密码，为了安全性，系统生成一个随机密码，需要找到这个密码。
[https://blog.csdn.net/hua1011161696/article/details/80666025](https://blog.csdn.net/hua1011161696/article/details/80666025 "点我呀（解决坑的办法）")
### 关键字解释
1. database:关联表的集合      
2. table :表是数据的矩阵        
3. coloumn:列/字段，包含相同的数据，字段类型
4. row:行（元组，记录），一组相关的数据    

## SQL语句概述

#### sql(Structured Query Language) 结构化查询语言，是用于访问和处理数据库的标准计算机语言

### SQL 规则：
1. 必须语句大写，在命令行可以小写
2. 注释：#   或则 -- 加空格   例如 -- show databases;  多行注释  /**/ 
3. 以分号结尾;   修改结尾符号 delimiter //   
  
## 数据类型
![](https://i.imgur.com/sQEbiM5.png)

![](https://i.imgur.com/n9qHkIH.png)

![](https://i.imgur.com/8P37Oz7.png)

![](https://i.imgur.com/AlnjpCa.png)

![](https://i.imgur.com/w2883BK.png)
![](https://i.imgur.com/luZSIiL.png)
![](https://i.imgur.com/HVPOHLD.png)
![](https://i.imgur.com/ZDHX6hk.png)
![](https://i.imgur.com/Vq6FJgD.png)

![](https://i.imgur.com/7D3e0Pb.png)

![](https://i.imgur.com/lyaOOZ7.png)

### 查看系统数据库密码等
 1.use mysql

 2.select user,host,authentication_string from user;

3.create user 'blog'@'%' identified by '123456';  //创建用户。
![](https://i.imgur.com/bKnwbPs.png)


#### 数据库相关操作
	show databases;  // 显示数据库；
	create database shop;  //
	use shop;  //使用shop数据库
	drop database shop; //删除shop 数据库

#### 表的相关操作DDL
	use shop;  //需要先进入到某个数据库,切换数据
	// 创建表
	create table user(
	id int unsigned auto_increment not null primary key comment '用户id',
	user_name varchar(20) not null default 'admin',
	password char(32) not null comment '用户密码'
	);  //所有字段都加上not null 潜规则
	
	show tables; //查看所有表；
	desc user; //查看表结构；
	show create table user; // 查看创建表user当时的代码。表名，字段名 加了反引号 关键字大写啦（代码里面都是大写）；
	ALTER TABLE user RENAME users;  //表名不合适，更改表名；
	//突然发现少了字段
	ALTER TABLE users ADD email varchar(50) not null comment '用户邮箱';
	//想添加个字段到email 前面
	ALTER TABLE users ADD mobile char(11) not null AFTER password;
	// 发现email 数据长度太大啦，想修改一下
	ALTER TABLE users MODIFY email varchar(30) not null;
	// 发现字段名不太合适，想修改一下
	ALTER TABLE users CHANGE email user_email varchar(30) not null;
	//删除某个字段
	ALTER TABLE users DROP mobile;
	// 删除表
	 drop table users;

#### DML 数据操作语言(插入，修改，删除)
	0.查看数据
	// 查看数据
	SELECT * FROM user; 
	1.增加数据
	INSERT INTO user (id,user_name,password) VALUES (1,'zhangsan','123456');

	可以不用加id,因为是自增的
	INSERT INTO user (user_name,password) VALUES ('zhangsan','123456');

	//可以不加字段，但是字段要一一对应；
	INSERT INTO user VALUES (4，'zhangsan','123456');
	// 插入user_name 中文字段保持；
	
	2.更新数据
	UPDATE user SET password=123456;  //把所有数据都改啦。
	UPDATE user SET password=123456 WHERE id=3;
	UPDATE user SET password=123456,user_name='zhagnmingyi' WHERE id=3;
	3.删除数据（要加where 条件）

	DELETE FREOM user WHERE id = 5;
	DELETE FROM user; //清空表数据，id从最后一个开始
	TRUNCATE user; //清空表数据，id从1开始

### DCL(数据控制语言)
	一、查看系统数据库；
	系统数据库mysql. 
	1.use mysql;
	2.show tables; //找到user表；
	3.select user,host,authentication_string from user;  //可以看到系统用户 root,host,还有密码；
	

	二、创建一个新的普通用户blog，允许特定IP访问。
	CREATE USER 'blog'@'192.168.1.107' IDENTIFIED BY '123456'；

	// 所有用户都可以连接，只要知道用户名，密码
	CREATE USER 'blog'@'%' IDENTIFIED BY '123456'；

	// 刷新权限列表
	flush privileges;
 create table blog(
    -> id int unsigned auto_increment not null primary key,
    -> title varchar(60) not null,
    -> time int not null,
    -> content logtext not null
    -> );