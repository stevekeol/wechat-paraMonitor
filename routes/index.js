var express = require('express');
var router = express.Router();
var getWXConfig = require('./getWXConfig.js');

/********************************* 微信jssdk(jsweixin) *********************************************/


//二维码扫描处理页面
router.get('/scanPage', function(req, res) {
    getWXConfig.getConfig(req, function (cfg) {
        res.render('scanPage', {wxCfg: JSON.stringify(cfg)});
    });
}); 

/********************************* 用户和页面跳转(Test Area) *********************************************/
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// router.get('/index', function(req, res) {
//   res.redirect('index');
// });

router.get('/myDevices', function(req, res) {
  res.render('myDevices');
});

router.get('/devList', function(req, res) {
  res.render('devList');
});

router.get('/mall', function(req, res) {
  res.render('mall');
});

router.get('/mall-2', function(req, res) {
  res.render('mall-2');
});


router.get('/signup', function(req, res) {
  res.render('signup');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/terms', function(req, res) {
  res.render('terms');
});

router.get('/rtMonitor', function(req, res) {
  res.render('rtMonitor');
});

router.get('/rtMonitorPage', function(req, res) {
  res.render('rtMonitorPage');
});

router.get('/rankingList', function(req, res) {
  res.render('rankingList');
});

router.get('/reportPage', function(req, res) {
  res.render('reportPage');
});



router.post('/loginPost', function(req, res) {
    var userLogin = {
        account: req.body.account,
        password: req.body.password,
        phone: req.body.phone
    };
    
    var User = global.dbHandler.getModel('user');
    User.findOne({'account': userLogin.account}, function(err, row) {
        // console.log('oneUserFinded!, return(account & password): ' + row);
        if(err) {
            res.send({"code": "00"});  //数据库操作失败
            console.log(err); //将err打印在控制台
        }
        if(row) {
            User.findOne({'account':userLogin.account,'password': userLogin.password}, {'account':1, 'password':1}, function(err, row){
                console.log('oneUserFinded: ' + row);                
                if(err){
                    res.send({"code": "01"}); //密码错误
                }
                if(row){
                    res.send({"code": "02"}); //登录成功
                }
            });
        }else{
            res.send({"code": "03"});  //未注册
        }
    });
});

router.post('/signupPost', function (req, res) {
	var userLoginup = {
		account: req.body.account,
		gender:  req.body.gender,
		phone: req.body.phone,
		birthday: req.body.birthday,
		password: req.body.password
	};

    console.log('account: ' + userLoginup.account);
    console.log('gender: ' + userLoginup.gender);
    console.log('phone: ' + userLoginup.phone);
    console.log('birthday: ' + userLoginup.birthday);
    console.log('password: ' + userLoginup.password);

	var User = global.dbHandler.getModel('user');
    User.findOne({'account': userLoginup.account}, function(err, row) {
        if(err) {
            res.send({"code": "00"});  //数据库操作失败
        }
        console.log('createUser...findOne()...return: ' + row);
        if(row) {
            res.send({"code": "01"}); //创建账号时已存成
        } else {
            // var curDate = new Date().getTime();
            // userLoginup['createTime'] = curDate;
            // userLoginup['lastModifiedTime'] = curDate;

            // console.log('CreateUser & userLoginup : ');
            // console.log(userLoginup);

            User.create(userLoginup, function(err, ret) {
                if(err) {
                    res.send( {"code": "00"} ); //数据库操作失败
                } else{
                    res.send({"code": "02", "body": ret._id});   //创建账号成功
            }
            });
        }
    });
});



router.get('/corpLocation', function(req, res) {
  res.render('corpLocation');
});


router.get('/aboutMe', function(req, res) {
  res.render('aboutMe');
});


module.exports = router;
