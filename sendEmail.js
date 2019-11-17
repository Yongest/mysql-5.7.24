var nodemailer = require('nodemailer');

//username替换为邮箱名，%40后面是邮件服务器的地址，比如163.com，password替换为邮箱密码（或独立密码，如果有设置的话），@后面填SMTP服务器地址，如163的smtp地址为smtp.163.com
// var transport = nodemailer.createTransport('smtps://username%40163.com:password@smtp.163.com');
// var transport = nodemailer.createTransport('smtps://1046788379%40qq.com:rhwnlfcfqpkebdje@smtp.qq.com'); 
var transport = nodemailer.createTransport('smtps://550695739%40qq.com:vmkgotbqydgvbaig@smtp.qq.com'); 

var mailOptions = {
  from: '550695739@qq.com',  //发件人
  subject: '《道德经》兴趣爱好交流群期待您的加入',  //邮件主题
  text: '',  //邮件文本
  html: `<p style="text-indent:2em">两千年前，老子出函谷关，一路西去，最终去了哪里成为了历史上的一个千古之谜。
  唯一的线索是:他给我们留下了一本《道德经》，仅此而已。《道德经》一共是81章。是中华文明智慧及哲理的源泉，
  是修身、为学、治国、平天下的第一宝典。
  《道德经》全书都在围绕一个“道”字。“ 道可道，非常道”。“道”究竟是什么?它对我们有什么作用?加入我们，让我们一起来探讨、交流。
</p>
  <p style="text-indent:2em">学习交流中华传统文化精华，为中华文化的传承奉献自己的力量。这无论是对自己,身边人,还是自己的后代都是利而无害的。</p>
    <h3>真诚期待您的加入：</h3>
    <img src="http://120.79.206.175/erweima.jpg">
    <h3>微信号:zhangzelaiNO1</h3>
  `  //html格式文本
};
var email = 550695755
let index = 0;
function sendEmail(emailNumber){
  mailOptions.to = emailNumber   +'@qq.com'
  transport.sendMail(mailOptions, function(err, info){
    try {
      console.log('Message sent: ' + info.response,'--',email,'--',index);
    }catch(e){

    }
      index++
      email++
    
      if(err){
        return console.log(err);

      }
    });
}
// let arr = ["349149672@qq.com", "352563846@qq.com", "353868510@qq.com", "357401994@qq.com", "358634864@qq.com",
//  "382331834@qq.com", "402455873@qq.com", "441978519@qq.com", "474848196@qq.com", "493785313@qq.com", "495944230@qq.com", 
//  "496768711@qq.com", "504788706@qq.com", "565499335@qq.com", "573794704@qq.com", "584067027@qq.com", "672816831@qq.com", 
//  "675234333@qq.com", "741547213@qq.com", "809045589@qq.com", "810988791@qq.com", "819663522@qq.com", "825178171@qq.com", "837848772@qq.com", 
//  "846620043@qq.com", "847905303@qq.com", "958255056@qq.com", "963379834@qq.com", "963853385@qq.com", "994690010@qq.com", 
//  "1012488812@qq.com", "1019781035@qq.com", 
//  "1024452777@qq.com", "1064534421@qq.com", "1191328789@qq.com",
//  "1251823226@qq.com", "1321267750@qq.com", "1468924117@qq.com", "1798910835@qq.com", "2015930232@qq.com"]


sendEmail(email)
setInterval(()=>{
  sendEmail(email)
},60000)


