//1:加载模块 express pool.js
const express=require("express");
const pool=require("./pool");
//2:创建服务器端对象
var app=express();
//3:监听 3000
app.listen(3000);
//4:指定静态目录  public
app.use(express.static("public"));
//5:加载跨域访问模块
//6:配置跨域访问模块  允许哪个域名跨域
const cors=require("cors");
//origin 允许跨域访问域名列表
//credentials 跨域访问保存session id
app.use(cors({
  origin:["http://127.0.0.1:8080","http://locallhost:8080"],
  credentials:true
}));
//配置session
const session=require("express-session");
app.use(session({
  secret:"128位随机字符",
  resave:false,
  saveUninitialized:true,
  cookie:{
    maxAge:1000 * 60 * 60 * 8
  }
}));
//7.加载第三方模块body-parser
const bodyParser=require("body-parser");
//8.配置对特殊json是否自动转换 不转
app.use(bodyParser.urlencoded({extended:false}))
app.get("/imageList",(req,res)=>{
  var list=[
    {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
    {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
    {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
    {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"}
  ];
  res.send(list);
}); 
app.get("/newslist",(req,res)=>{
  //1:获取参数 pno pageSize
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  //2:设置默认值 pno 1 pageSize 7
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=7;
  }
  //3:创建sql语句
  var sql="SELECT id,title,img_url";
  sql+=" ,ctime,point";
  sql+=" FROM xz_news";
  sql+=" LIMIT ?,?"
  var ps=parseInt(pageSize);
  var offset=(pno-1)*pageSize;
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})
//功能二:商品分页显示 
app.get("/product",(req,res)=>{
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=7;
  }
  var sql="SELECT l.lid,l.title,";
  sql+=" l.price,p.md";
  sql+=" FROM xz_laptop l,xz_laptop_pic p";
  sql+=" WHERE l.lid = p.laptop_id";
  sql+=" GROUP BY l.lid";
  sql+=" LIMIT ?,?";
  var offset=(pno-1)*pageSize;
  var ps=parseInt(pageSize);
  pool.query(sql,[offset,ps],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
});
//功能三:获取新闻详细信息
app.get("/findnewsinfo",(req,res)=>{
  //1:获取参数
  var id=req.query.id;
  //2:创建正则表达式
  var reg=/^\d{1,}$/;
  //3:如果验证失败 输出错误信息{code:-1}
  if(!reg.test(id)){
    res.send({code:-1,msg:"新闻编号格式有误"});
    return;
  }
  //4:创建sql
  var sql="SELECT id,title,content,ctime,img_url FROM xz_news WHERE id=?"
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
  //5:
});
app.get("/getComment",(req,res)=>{
  var nid=req.query.nid;
  var pno=req.query.pno;
  var pageSize=req.query.pageSize;
  if(!pno){
    pno=1;
  }
  if(!pageSize){
    pageSize=5;
  }

  var sql=" SELECT id,content,ctime,nid";
    sql+=" FROM xz_comment";
    sql+=" WHERE nid=?";
    sql+=" LIMIT ?,?";
  var offset=(pno-1)*pageSize;
  var pageSize=parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
});
//  功能五:发表了评论
//1:用户postpone请求/addcomment
app.post("/addcomment",(req,res)=>{
  //2:获取二个参数 nid content
  var nid=req.body.nid;
  var content=req.body.content;
  //3:创建sql语句
  var sql="INSERT INTO xz_comment VALUES";
  sql+="(null,?,now(),?)";
  //4:发送sql语句并且返回返回结果
  pool.query(sql,[content,nid],(err,result)=>{
    if(err) throw err;
    //5:判断 评论成功 评论失败
    if(result.affectedRows>0){
      res.send({code:1,msg:"评论发表成功"});
    }else{
    res.send({code:-1,msg:"评论发表失败"});
   }
  })  
})

//6:加载body-parser模块 配置 写在app.js前面

//功能七:获取商品详细信息
app.get("/findProduct",(req,res)=>{
  //1：参数 pid
  var pid=req.query.pid;
  var sql="SELECT lname,price FROM xz_laptop WHERE lid=?";
  pool.query(sql,[pid],(err,result)=>{
    if(err) throw err;
    res.send({code:1,data:result});
  })
})
//功能八:用户登陆验证
app.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;
  var sql="SELECT id FROM xz_login WHERE uname=?AND upwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
      res.send({code:-1,msg:"用户名或密码错误"});
    }else{
      var id=result[0].id;
      req.session.uid=id;
      console.log(req.session.uid);
      res.send({code:1,msg:"登陆成功"});
    }
  })
})
//功能九:添加购物车
app.get("/addcart",(req,res)=>{
  var pid=parseInt(req.query.pid);
  var count=1;
  var uid=req.session.uid;
  console.log(req.session.uid);
  var price=parseInt(req.query.price);
  var sql="SELECT id FROM xz_cart WHERE uid=? AND pid=?";
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err) throw err;
    if(result.length==0){
     var sql=`INSERT INTO xz_cart VALUES(null,1,${price},${pid},${uid})`;
    }else{
     var sql=`UPDATE xz_cart SET count=count+1 WHERE pid=${pid} AND uid=${uid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
      
    })
  })
});
//功能十:购物车列表
app.get("/cartlist",(req,res)=>{
  var uid=req.session.uid;
  console.log(req.session.uid);
  var sql="SELECT c.id,c.count,c.price,";
  sql+="c.uid,c.pid,l.lname";
  sql+=" FROM xz_cart c,xz_laptop l";
  sql+=" WHERE l.lid=c.pid";
  sql+=" AND c.uid=?";
  pool.query(sql,[uid],(err,result)=>{
    if(err) throw err;
   res.send({code:1,data:result});
  })
})
//功能十一:删除购物车中商品
app.get("/delcartitem",(req,res)=>{
  var id=req.query.id;
  var sql="DELETE FROM xz_cart WHERE id = ?";
  pool.query(sql,[id],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:-1,msg:"删除失败"})
    }
  })
})
//功能十二:删除购物车多个指定商品
app.get("/remove",(req,res)=>{
  var ids=req.query.ids;
  var sql="DELETE FROM xz_cart";
  sql+=" WHERE id IN ("+ids+")";
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:-1,msg:"删除失败"})
    }
  })
})

