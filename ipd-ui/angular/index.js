/*!
 * jmq server node
 */
var express = require('express');
var path = require('path');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var redisOpt = {
	// pass: '',
	cookieSecret: 'nodejmq',//cookie加密与数据库无关
	db: 0,//数据库的名称
	host: '127.0.0.1',//数据库的ip
	port: '27017',//数据库的端口号
}
var app = express();


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'nodeusedinjmq@jd',
	store: new redisStore(redisOpt),
	resave: false,
	saveUninitialized: false
}))


// checkLogin = (req, res, next) => {
// 	if(!req.session.user){
// 		res.redirect('/login');
// 	}
// 	next();
// }
// app.use(/^\/login/, checkLogin)
// app.use((req, res) => {
// 	res.sendFile(path.join(__dirname, 'public/index.html'))
// })
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.get('/\/#\/./', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
});

var Mock = require('mockjs');
app.get('/api/menuList', (req, res) => {
  var data = Mock.mock([
  {
    "name": "sys1",
    "apps": [
        "app1",
        "app2",
        "app3"
      ]
  },
  {
    "name": "sys2",
    "apps": [
        "app21",
        "app22",
        "app23"
      ]
  },
  {
    "name": "sys3",
    "apps": [
        "app31",
        "app32",
        "app33"
      ]
  }
]);
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tableService', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data|1-500": [
        {
            "name": "test"
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tableWrong', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data|1-500": [
        {
            "name": "test",
            "number|+1": 1
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tableWrongDetail', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data|1-500": [
        {
            "name": "test",
            "source": "去向"
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tableWrongRoute', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data": [
        {
          "layer": 0,
          "name": "test",
          "name2": "tests",
          "QPS": 20,
          "QPSMax": 34,
          "average": 30,
          "local": 10
        },
        {
          "layer": 1,
          "name": "test",
          "name2": "tests",
          "QPS": 20,
          "QPSMax": 34,
          "average": 30,
          "local": 10
        },
        { 
          "layer": 2,
          "name": "test",
          "name2": "tests",
          "QPS": 20,
          "QPSMax": 34,
          "average": 30,
          "local": 10
        },
        { 
          "layer": 0,
          "name": "test",
          "name2": "tests",
          "QPS": 20,
          "QPSMax": 34,
          "average": 30,
          "local": 10
        },
        {
          "layer": 1,
          "name": "test",
          "name2": "tests",
          "QPS": 20,
          "QPSMax": 34,
          "average": 30,
          "local": 10
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tableAppManage', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data|1-500": [
        {
            "name": "test"
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tableIP', (req, res) => {
	var data = Mock.mock({
        "draw": 3,
        "pageSize": 10,
        "pageIndex": 0,
        "recordsTotal": 57,
        "recordsFiltered": 0,
        "data|1-1000": [
            {
                "name": "test",
                "cpu": "cpu",
                "memory": "memory",
                "zone": "zone"
            }
          ]
    });
    res.send(JSON.stringify(data, null))
});

app.get('/api/source', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data|1-500": [
        {
            "ip": "10.3.4.4",
            "cpu": [3,4,5,56],
            "memory": [4,4,5,5]
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/entry', (req, res) => {
  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    // 'list|1-10': [{
    //     // 属性 id 是一个自增数，起始值为 1，每次增 1
    //     'id|+1': 1
    // }],
    "pageSize": 10,
    "pageIndex": 0,
    "recordsTotal": 57,
    "recordsFiltered": 0,
    "data|1-500": [
        {
            "name": "那",
            "QPS": 33,
            "QPSMax": 233,
            "tp90": "5ms",
            "tp99": "53ms",
            "average": "33ms",
            "rate": "0.4%",
            "zone": [{"m13": "45%"}, {"dsf": "34%"}]
        }
      ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/peity', (req, res) => {
  var data = Mock.mock({
        "cpu": [3,4,5,56],
        "memory": [4,4,5,5]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/callChart', (req, res) => {
  var data = Mock.mock({
    "time": [1,2,3,4,5],
    "series":  [{
            name:'邮件营销',
            type:'line',
            data:[120, 132, 101, 134, 90, 230, 210]
    }]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/tpChart', (req, res) => {
  var data = Mock.mock({
    "time": ["10:10", "12:20", "10:30", "10:40", "10:50", "11:00"],
    "series":  [{
            name:'tp性能',
            type:'line',
            data:[120, 132, 101, 134, 90, 230, 210]
    }]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.get('/api/sourceChart', (req, res) => {
  var data = Mock.mock({
    "time": ["10:10", "12:20", "10:30", "10:40", "10:50", "11:00"],
    "series":[ {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
             ]
  });
  res.send(JSON.stringify(data, null, 4))
});

app.listen(3000)
module.exports = app;