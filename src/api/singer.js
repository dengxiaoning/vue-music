import jsonp from '@/common/js/jsonp'
import {commonparams, options} from './config'
import axios from 'axios'

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonparams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1664029744
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singeId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonparams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1,
    g_tk: 1664029744,
    singermid: singeId
  })
  return jsonp(url, data, options)
}

export function getMusicBySongmid(songmid) {
  const url = '/api/getMusic'
  const data = Object.assign({}, commonparams, {
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a',
    guid: 3779844088, // 改值需要随时跟随qq音乐实际的播放器而改变
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    cid: 205361747,
    uin: 2502,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(err => {
    return Promise.reject(err)
  })
}
