import {playMode} from '@/common/js/config'
import {loadSearch, loadPlay, loadFavorite} from '@/common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: 0,
  cSong: {},
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
export default state
