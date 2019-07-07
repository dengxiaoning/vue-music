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

/**
 * 这种个方法是用于createSong同时根据somgmid查询对于的vkey,但是太耗费性能故已摒弃
 * @deprecated
 * @param songmid
 * @returns {Promise<any>}
 */
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

/**
 * 根据songmid 获取vkey
 * @param songmid
 * @returns {Promise<any>}
 */
export function getplaysongvkey(songmid) {
  const url = '/api/getplaysongvkey'
  const data = Object.assign({}, commonparams, {
    // -: 'getplaysongvkey7257571376863041',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: `{"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"7347620869","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"7347620869","songmid":["${songmid}"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}`
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data.req_0.data.midurlinfo[0].purl)
  })
}
