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

## 查看系统数据库密码等
 1.use mysql

 2.select user,host,authentication_string from user;

3.create user 'blog'@'%' identified by '123456';  //创建用户。
![](https://i.imgur.com/bKnwbPs.png)


## 数据库相关操作
	show databases;  // 显示数据库；
	create database shop;  //
	use shop;  //使用shop数据库
	drop database shop; //删除shop 数据库

## 表的相关操作DDL
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

## DML 数据操作语言(插入，修改，删除)
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

## DCL(数据控制语言)
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
    
    三、给blog 用户授权。
    1.授权（*.*  授权所有数据库，表）（GRANT ALL ON *.* TO 'blog'@'192.168.1.107'; //授所有权限，上线时，可以给用户回收大部分权限）
    GRANT insert,update,delete ON blog.* TO 'blog'@'192.168.1.107';  //*代表blog 数据库所有的表
    2.查看权限
    在root用户里面查看权限
    SHOW GRANTS FOR blog@192.168.1.107;  //注意blog ip 不要加引号。
    3.回收权限
    REVOKE insert,update ON 数据库名.* FROM 用户名 @IP地址或者% ;
    4.创建用户，并且授权
    grant all on shop.* to 'shop'@'192.168.1.107' identified by '123456'; //只给了shop表权限
    5.删除用户。
    drop user 用户名@'192.168.1.107'；
    6.修改密码
    mysqladmin -uroot -p112233 password 123456;
    7.忘记密码怎么办？
    7.1 先在后台停啦mysql 服务，
    7.2 运行 mysqld --skip-grant-tables;
    7.3 更新密码
    update user set authentication_string = password('123456') where user='root';

## DQL数据查询语言
	where 条件
	=
	!=  <>
	<   >   <=    >=
	OR 或者 ||
	AND 且 && 
	BETWEEN 5 AND 10
	NOT IN 
	like '$值$'  左模糊，右模糊  全模糊
	
	where age between 30 and 37;
	where age in (30,37);
	where age not in (30,37);
	where user_name like '%n%';
	where user_name like 'n%';
	where user_name like '%n';
	
	select * from user *性能不好，用哪个查哪个；
	查询时，改字段的名字（别名,alias），
	select user_name as username,user_emai from user;
	
	连接字段
	select concat(user_name,age) as name_age from user;
	连接字段分隔符
	select concat_ws('==',user_name,age) as name_age from user;
	去除重复的
	select distinct user_name from user;
	限制条数（限制2条）
	select * from user limit 2;
	两个参数,第二条开始，查询3条（分页功能）
	select * from user limit 1,3;
	
	排序（降序）
	select * from user order by id desc;
	排序（升序）
	select * from user order by id asc;
	聚合函数
	// 总条数
	SELECT COUNT(*) FROM user;
	SELECT COUNT(id) FROM user;  //不准确（中间可能有删除数据）,但经过测试是准确的，字段没有值时，也是查寻总条数
	
	求和
	select sum(age) from user;
	求平均值
	select avg(age) from user;
	求最大值
	select max(age) from user;
	select min(age) from user;
	分组
	select gender from user group by gender;
	统计男女人数
	select count(id) ,gender from user group by gender;
	统计分组中，数量大于5的分组
	select count(id) ,gender from user group by gender having count(id);
	统计男女年龄平均值，
	select avg(age),gender from user group by gender;
	统计男女年龄最大值
	select max(age),gender from user group by gender;
	先按性别分组，然后查出分组中数据条数大于5条的人数。
	select count(age) ,gender from user group by  gender having count(age)>5;
	+------------+--------+
	| count(age) | gender |
	+------------+--------+
	|          7 |      1 |
	+------------+--------+
	先按性别分组，然后查出分组中年龄总和大于100的人数。
	select sum(age) ,gender from user group by  gender having sum(age)>100
	+----------+--------+
	| sum(age) | gender |
	+----------+--------+
	|      103 |      0 |
	|      175 |      1 |
	+----------+--------+

## 连表查询（连接查询，联合查询，子查询）
1.  连接查询（内连接，外连接<左连接，右连接>，全连接）
	
	1.1内连接（笛卡尔积连接）
    学生信息表

    |  id  | name | email | mobile |
    | :--: | :--: | :---: | :----: |
    |  1   |  mingyi   |   3798@qq.com   |   4    |
	|  2   |  shanshan   |   fsfsf@qq.com   |   4    |

    学生成绩表

	|  id  | stu_id | mark |
    | :--: | :--: | :---: |
    |  1   |  2   |  99   | 
	|  2   |  1   |  100  | 
	
		内连接查询 inner join(显示的和隐式的）
		(笛卡尔积）
		select * from student,mark;
		select * from student,mark where student.id=mark.stu_id;
		select * from student,mark where student.id=mark.stu_id and student.name='mingyi' ;
		+----+--------+----------------+--------+----+--------+------+
		| id | name   | email          | mobile | id | stu_id | mark |
		+----+--------+----------------+--------+----+--------+------+
		|  2 | mingyi | 1023434@qq.com | 23434  |  2 |      2 |  100 |
		+----+--------+----------------+--------+----+--------+------+
		别名(减少语句长度）
		select s.name,s.mobile,m.mark,s.id from student as s,mark as m where m.stu_id=s.id and s.name='mingyi';
		显示的(把两个表中间的逗号去掉换成inner join）
		select s.name,s.mobile  m.mark,s.id from student as s inner join mark as m where m.stu_id=s.id and s.name='mingyi';
    	在内连接的时候加on 或者where 都可以(on 可以替换where)；
		select s.name,s.mobile  m.mark,s.id from student as s inner join mark as m on m.stu_id=s.id and s.name='mingyi';
		join   默认是 inner join （可以不加inner）
		
		右连接，以右边的数据为主
		select s.name,s.mobile,m.mark from student as s right join mark as m on m.stu_id=s.id;
		左连接，以左边的数据为主
		select s.name,s.mobile,m.mark from student as s left join mark as m on m.stu_id=s.id;
		子查询()
		select * from student where id in(2,3,4);
		select * from student where id in (select stu_id from mark where id>1);

		联合查询（竖向累加），注意前后字段要一样
		字段值相同时，会去掉。
		select id from student union select id from mark;
		+----+
		| id |
		+----+
		|  1 |
		|  2 |
		|  3 |
		|  4 |
		|  5 |
		|  6 |
		|  7 |
		|  8 |
		|  9 |
		| 10 |
		| 11 |
		| 12 |
		| 13 |
		| 14 |
		+----+

		
		select id from student union all select id from mark;
		字段值相同时，不会会去掉。
	1.2 外连接（左连接，右连接）


​
如何给表增加一个字段。