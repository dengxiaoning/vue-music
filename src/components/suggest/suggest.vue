<template>
  <Scroll class="suggest"
          :data="result"
          :pullup="pullup"
          @scrollToEnd="searchMore"
          ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item,index) in result"
          :key="index">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <load v-show="hasMore" title=""></load>
    </ul>
  </Scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from '@/api/search'
  import {ERR_OK} from '@/api/config'
  import {createSong} from '@/common/js/song'
  // import {getMusicBySongmid} from '@/api/singer'
  import Scroll from '@/base/scroll/scroll'
  import Load from '@/base/load/load'
  import Singer from '@/common/js/singer'
  import {mapMutations} from 'vuex'

  const TYPE_SINGER = 'singer'
  const perpage = 30
  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        getresult: {},
        pullup: true,
        hasMore: true
      }
    },
    methods: {
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        search(this.query, this.page, this.showSinger, perpage).then((res) => {
          if (res.code === ERR_OK) {
            // this.result = this.result.concat(this._genResult(res.data))
            this.result = Array.from(new Set(this.result.concat(this._genResultAgan(res.data))))
            this._checkMore(res.data)
          }
        })
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name} - ${item.singer}`
        }
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        }
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _genResultAgan(data) {
        let ret = []
        if (data.song) {
          // 因为如下方法是异步，使用，ret = ret.concat(this._normalizeSongs(data.song.list)) 无法获取返回值
          // this._normalizeSongs(data.song.list)
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          // 因为如下方法是异步，使用，ret = ret.concat(this._normalizeSongs(data.song.list)) 无法获取返回值
          // this._normalizeSongs(data.song.list)
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      // _normalizeSongs(list) {  // 这个太浪费性能。。。而且又严重的异步请求难以控制，如
      //   let ret = []  //  ret = ret.concat(this._normalizeSongs(data.song.list)) 无法获取返回值
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
      //   this.getresult = ret
      //   return ret
      // }
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    watch: {
      query() {
        this.search()
      }
      // getresult(val) { 由于在createSong时根据songmid异步获取了对应的vkey， 所以在ret = ret.concat(this._normalizeSongs(data.song.list)) 无法获取返回值
      //   // console.log(val)
      //   this.result = Array.from(new Set(this.result.concat(val)))
      //   console.log(this.result)
      // }
    },
    components: {
      Scroll,
      Load
    }
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"
  @import "~@/common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
