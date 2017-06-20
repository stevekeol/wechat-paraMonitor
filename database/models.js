var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var user = new Schema({
        account:          {type:String, required:true},
        password:         {type:String, required:true},
        phone:            Number,
        gender:           Number, //0-female ; 1-male
        // birthday:         Date,
        createTime:       Date,
        lastModifiedTime: Date,
    }, {
        autoIndex: false
    }
);

//模块接口
module.exports = {
    getSchema: function(name) {
        switch(name) {
            case 'user':
                return user;
        }
    }
};


// 【请教一下】：

// 当我用node框架express，和mongoDB开发时，

// 在路由中(如下)：
// router.post('/loginup', function (req, res) {
//     var userLoginup = {
//         account: req.body.account,
//         password: req.body.password,
//         phone: req.body.phone
//     };
//     var User = global.dbHandler.getModel('user');

//             User.create(userLoginup, function(err, ret) {
//                 if(err) {
//                     res.send( {"code": "00"} ); //数据库操作失败
//                     console.log('1111');
                 
//                 } else{
//                 res.send({"code": "02"});   //创建账号成功
//                 }
//             });
// });

// 当提交表单时，浏览器出现：
// {
//     "code": "00"
// }
// 终端出现：
// events.js:160
//       throw er; // Unhandled 'error' event
//       ^
// Error: Can't set headers after they are sent.

// 【疑问】：请问最有可能是哪儿出现问题？