import jsonp from '@/common/js/jsonp'
import {commonparams, options} from './config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const data = Object.assign({}, commonparams, {
    g_tk: 1369994321,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonparams, {
    topid,
    page: 'detail',
    type: 'top',
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
