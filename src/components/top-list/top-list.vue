<template>
  <transition name="slide">
    <music-list :title="title" :rank="rank" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '@/components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from '@/api/rank'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  import {getMusicBySongmid} from '@/api/singer'

  export default {
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    components: {
      MusicList
    },
    created() {
      this._geMusicList()
    },
    methods: {
      _geMusicList() {
        if (!this.topList || !this.topList.id) {
          this.$router.push('/rank')
          return
        }
        getMusicList(this.topList.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          const musicData = item.data
          if (musicData.songid && musicData.albummid) {
            // 传入songmid 查询获取 vkey
            getMusicBySongmid(musicData.songmid).then(res => {
              if (res.code === ERR_OK) {
                const svkey = res.data.items
                const songVkey = svkey[0].vkey
                const filename = svkey[0].filename
                const newSong = createSong(musicData, filename, songVkey)
                ret.push(newSong)
              } else {
                console.log('查询 svkey  错误！')
              }
            }).catch(err => {
              console.log(err)
            })
          }
        })
        return ret
      }
    },
    computed: {
      title() {
        if (this.topList) {
          return this.topList.topTitle
        }
        return ''
      },
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList'
      ])
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transition: transition3d(100%, 0, 0)
</style>
