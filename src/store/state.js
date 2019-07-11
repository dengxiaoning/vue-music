import {playMode} from '@/common/js/config'
import {loadSearch} from '@/common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mde: playMode.sequence,
  currentIndex: 0,
  cSong: {},
  disc: {},
  topList: {},
  searchHistory: loadSearch()
}
export default state
