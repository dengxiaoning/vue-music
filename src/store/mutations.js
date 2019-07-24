import Vue from 'vue'
import * as types from './mutation-type'

const mutations = {
  [types.SET_SINGER](state, singer) {
    // state.singer = singer
    Vue.set(state, 'singer', singer)
  },
  [types.SET_PLAYING_STATE](state, flag) {
    // state.playing = flag
     Vue.set(state, 'playing', flag)
  },
  [types.SET_FULL_SCREEN](state, flag) {
    // state.fullScreen = flag
    Vue.set(state, 'fullScreen', flag)
  },
  [types.SET_PLAYLIST](state, list) {
    // state.playList = list
    Vue.set(state, 'playList', list)
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    // state.sequenceList = list
    Vue.set(state, 'sequenceList', list)
  },
  [types.SET_PLAY_MODE](state, mode) {
   // state.mode = mode
    Vue.set(state, 'mode', mode)
  },
  [types.SET_CURRENT_INDEX](state, index) {
    // state.currentIndex = index
    Vue.set(state, 'currentIndex', index)
  },
  [types.SET_C_SONG](state, song) {
    // state.cSong = song
    Vue.set(state, 'cSong', song)
  },
  [types.SET_DISC](state, disc) {
    Vue.set(state, 'disc', disc)
  },
  [types.SET_TOP_LIST](state, topList) {
    Vue.set(state, 'topList', topList)
  },
  [types.SET_PLAYLIST_URL](state, keyUrl) {
    let index = keyUrl.index
    let url = keyUrl.url
    state.playList[index].url = url
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    // state.searchHistory = history
    Vue.set(state, 'searchHistory', history)
  },
  [types.SET_PLAY_HISTORY](state, history) {
    Vue.set(state, 'playHistory', history)
  },
  [types.SET_FAVORITE_LIST](state, list) {
    Vue.set(state, 'favoriteList', list)
  }
}

export default mutations
