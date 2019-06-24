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
