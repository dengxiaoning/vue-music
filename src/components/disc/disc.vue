<template>
  <transition name="side">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '@/components/music-list/music-list'
  import {mapGetters} from 'vuex'
  // import {getMusicBySongmid} from '@/api/singer'
  import {getSongList} from '@/api/recommend'
  import {ERR_OK} from '@/api/config'
  import {createSongNew} from '@/common/js/song'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList()
    },
    components: {
      MusicList
    },
    methods: {
      _getSongList() {
        getSongList(this.disc.dissid).then((res) => {
          res = res.replace(/^\w+\(/, '').replace(/\)$/, '')
          res = JSON.parse(res)
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      // _normalizeSongs(list) {
      //   let ret = []
      //   list.forEach((musicData) => {
      //     if (musicData.songid && musicData.albummid) {
      //       // 传入songmid 查询获取 vkey
      //       getMusicBySongmid(musicData.songmid).then(res => {
      //         if (res.code === ERR_OK) {
      //           const svkey = res.data.items
      //           const songVkey = svkey[0].vkey
      //           const filename = svkey[0].filename
      //           const newSong = createSong(musicData, filename, songVkey)
      //           ret.push(newSong)
      //         } else {
      //           console.log('查询 svkey  错误！')
      //         }
      //       })
      //     }
      //   })
      //   return ret
      // },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSongNew(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
