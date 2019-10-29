-- 创建新闻表
-- 1:表名xz_news
-- 2:几列4
-- 3:列名id/title/img_url/ctime/point/content
-- 4：类型
-- id   INT 
-- title VARCHAR(255)
-- img_url VARCHAR(255)
-- ctime DATETIME
-- point INT
-- content VARCHAR(2000)
-- 5：添加20条
CREATE TABLE xz_news(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  img_url VARCHAR(255),
  ctime DATETIME,
  point INT,
  content VARCHAR(2000)
);
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'231','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'232','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'233','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'235','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'236','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'237','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'238','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'239','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'210','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');
INSERT INTO xz_news VALUES(null,'234','http://127.0.0.1:3000/1.png',now(),0,'123');

-- 功能二:创建评论表
-- 内容;时间;哪条新闻;编号
CREATE TABLE xz_comment(
  id INT PRIMARY KEY AUTO_INCREMENT,
  content VARCHAR(50),
  ctime DATETIME,
  nid INT
);
INSERT INTO xz_comment VALUES(null,'赞一个1',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个2',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个3',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个4',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个5',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个6',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个7',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个8',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个9',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个10',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个11',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个12',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个13',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个14',now(),1);
INSERT INTO xz_comment VALUES(null,'赞一个15',now(),1);

#创建用户登录表
#用户登录密码需要加密保存使用 mysql自带函数md5()
CREATE TABLE xz_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(25),
   upwd VARCHAR(32)
);
INSERT INTO xz_login VALUES(null,'tom',md5('123'));

#创建购物车列表
CREATE TABLE xz_cart(
  id INT PRIMARY KEY AUTO_INCREMENT,
  count INT,
  price DECIMAL(15,2),
  pid INT,
  uid INT
);