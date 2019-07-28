var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();
const axios = require('axios')

axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var apiRoutes = express.Router();
app.use('/api', apiRoutes);

app.get('/api/getDiscList', (req, res) => {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log('错误日志')
    console.log(e)
  })
}),
  app.get('/api/getMusic', (req, res) => {
    var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log('错误日志')
      console.log(e)
    })
  }),
  app.get('/api/getplaysongvkey', function (req, res) { // 获取vkey
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios.get(url, {
      headers: {
        origin: 'https://y.qq.com',
        referer: 'https://y.qq.com/portal/player.html'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e)=>{
      console.log(e)
    })
  }),
  app.get('/api/lyric', (req, res) => {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      res.json(response.data)
    }).catch((e) => {
      console.log('错误日志')
      console.log(e)
    })
  }),
  app.get('/api/getSongList', (req, res) => {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      var ret = response.data
      res.json(ret)
    }).catch((e) => {
      console.log('错误日志')
      console.log(e)
    })
  }),
  app.get('/api/suggestSearch', (req, res) => {
    var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: req.query
    }).then((response) => {
      var ret = response.data
      res.json(ret)
    }).catch((e) => {
      console.log('错误日志')
      console.log(e)
    })
  })

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
