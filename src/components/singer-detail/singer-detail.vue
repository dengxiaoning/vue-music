<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from '@/api/singer'
  import {ERR_OK} from '@/api/config'
  import {createSongNew} from '@/common/js/song'
  import MusicList from '@/components/music-list/music-list'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer && this.singer.name
      },
      bgImage() {
        return this.singer && this.singer.avatar
      },
      ...mapGetters([ // 获取的值始终未更新，一直是第一次传入的值？？？
        'singer'
      ])
    },
    created() {
      // this.singer = this.$store.state.singer
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer || !this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      // _normalizeSongs(list) {
      //   let ret = []
      //   list.forEach((item) => {
      //     let {musicData} = item
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
      // }
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSongNew(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slide-enter-active, .slide-leave-active
    transition: all 0.6s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
