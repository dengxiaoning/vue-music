import jsonp from '@/common/js/jsonp'
import {commonparams, options} from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonparams, {
    platform: 'h5',
    uin: 0,
    needNewCod: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonparams, {
    platform: 'yqq',
    sin: 0,
    ein: 19,
    categoryId: 10000000,
    sortId: 5,
    needNewCode: 0,
    hostuin: 0,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
