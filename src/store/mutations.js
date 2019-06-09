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
    //  state.playList = list
    Vue.set(state, 'playList', list)
  },
  [types.SET_SEQUENCE_LIST](state, list) {
  //  state.sequenceList = list
    Vue.set(state, 'sequenceList', list)
  },
  [types.SET_PLAY_MODE](state, mode) {
   //  state.mode = mode
    Vue.set(state, 'mode', mode)
  },
  [types.SET_CURRENT_INDEX](state, index) {
    // state.currentIndex = index
    Vue.set(state, 'currentIndex', index)
  }
}

export default mutations
