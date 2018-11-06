## mysql 是一个软件

1.在目录下新建 data目录，新建my.ini 文件
2.在 my.ini 中 写入

```
[mysqld]
basedir = D:/mysql-5.7.24
datadir = D:/mysql-5.7.24/data
```

3.在cmd中执行D:\mysql-5.7.24\bin\msqld.exe --initialize-insecure   初始化数据库

4.配置环境变量D:\mysql-5.7.24\bin\

5.运行mysqld  打开数据库，运行 netstat -ano 可查看其其端口号为3306

6.连接数据库  mysql  -uroot -p        原密码为空

7.展示数据库，mysql> show databases;

8.更改数据库密码  C:\Users\10468>mysqladmin -uroot -p123456 password 112233

9.停止mysql  :        mysqladmin -uroot -p  shutdown

10.ERROR 2003 (HY000): Can't connect to MySQL server on 'localhost' (10061)   mysql没有启动

###踩过的坑
使用 mysql -uroot -p 的时候，在win7中需要输入密码，为了安全性，系统生成一个随机密码，需要找到这个密码。
[https://blog.csdn.net/hua1011161696/article/details/80666025](https://blog.csdn.net/hua1011161696/article/details/80666025 "点我呀（解决坑的办法）")
###关键字解释
1.database:关联表的集合      
2. table :表是数据的矩阵        
3. coloumn:列/字段，包含相同的数据，字段类型
4. row:行（元组，记录），一组相关的数据    

## SQL语句概述

#### sql(Structured Query Language) 结构化查询语言，是用于访问和处理数据库的标准计算机语言

###SQL 规则：
1. 必须语句大写，在命令行可以小写
2. 注释：#   或则 -- 加空格   例如 -- show databases;  多行注释  /**/ 
3. 以分号结尾;   修改结尾符号 delimiter //   
  
##数据类型
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

###查看系统数据库密码等
 1.use mysql

 2.select user,host,authentication_string from user;

3.create user 'blog'@'%' identified by '123';  //创建用户。
![](https://i.imgur.com/bKnwbPs.png)