<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory && searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
            </h1>
            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <suggest :query="query" @select="saveSearch" @listScroll="blurInput" ref="suggest"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有历史记录？"
             confirmButText="清空"
             @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from '@/base/search-box/search-box'
  import {getHotKey} from '@/api/search'
  import {ERR_OK} from '@/api/config'
  import Suggest from '@/components/suggest/suggest'
  import SearchList from '@/base/search-list/search-list'
  import Confirm from '@/base/confirm/confirm'
  import Scroll from '@/base/scroll/scroll'
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import {playlistMixin} from '@/common/js/mixin'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        hotKey: [],
        query: ''
      }
    },
    computed: {
      shortcut() {
        return this.hotKey.concat(this.searchHistory)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 200)
        }
      }
    },
    components: {
      SearchBox,
      Suggest,
      SearchList,
      Confirm,
      Scroll
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.shortcut.refresh()
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.suggest.refresh()
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      onQueryChange(query) {
        this.query = query
      },
      _geHotKey() {
        getHotKey().then((res) => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ]),
      ...mapMutations({
        setSearchHistory: 'SET_SEARCH_HISTORY'
      })
    },
    created() {
      this._geHotKey()
      // 判断searchHistory是否已经有值,如果有就提交到mutation,【解决localhost中有数据，但是历史列表无显示问题】
      let sHistory = this.$store.state.default.searchHistory
      if (sHistory && sHistory.length > 0) {
        this.setSearchHistory(sHistory)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"
  @import "~@/common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
