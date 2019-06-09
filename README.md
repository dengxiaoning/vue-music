# vue-music

> 音乐播放应用

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
***
### 开发中的一些问题
* 1 使用vuex 进行 项目状态管理  （问题：在页面使用 computed进行 ...mapGetter 数据获取，在state 中数据发生改变时同步更新组件）
  但是在 singer-detail.vue 中发现 state.singer 中对象已经发生改变了。但是 使用...mapGetter(['singer']) 获取的this.singer
  任然没有发生改变（任然是第一次赋值的对象）；后来使用直接获取的方式 `` this.singer = this.$store.state.singer` 可以获取到改变的值
   但是在 player.vue 中发现这种方式是否没有任何作用，于是再次寻找答案，终于在
>   CSDN https://blog.csdn.net/haoge744/article/details/88815196
 中找到了答案。直接将mutation 中 `state.prop = val 改为Vue.set(state,'prop',val) `问题得以解决

* 2 使用 state 中数据一直提示
``` javaScript
vue.esm.js?efeb:628 [Vue warn]: Error in render: "TypeError: Cannot read property 'undefined' of undefined"
found in
```
 原因 ： 异步显示的数据先显示vuex中的初始数据，再显示请求的数据，一开始在vuex中state中的初始数据为空，报错是因为在显示初始数据的时候报错
 在加载数据之前使用一下 v-if = "variable" 数据才解析

* 3  在.vue中直接使用 ` ...mapMutations ` 改变state
``` javaScript
    methods: {
      back() {
        this.setFullScreen(false)
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
```
## 发现一直提示
``` javaScript
[Vue warn]: Error in v-on handler: "TypeError: this.setFullScreen is not a function"

found in
```
######  what ? what what ? ?
* 我要画个圈圈诅咒你 ！

转了一圈后来才发现是 ` mapMutations`写错了位置

``` javaScript
    methods: {
      back() {
        this.setFullScreen(false)
      },
      ...mapMutations({
        setFullScreen: 'SET_FULL_SCREEN'
      })
    }
```
这要就ok 了， 所以细心是关键哈




|   language    |      familiarity    |      duration         |
|-------------- | :------------------:| :--------------------:|
|    C          |        general      |          1M           |
|    C++        |        general      |          3M           |
|    C#         |        general      |          7M           |
|    OC         |        general      |          2M           |
|   JAVA        |        general      |          3Y           |
|     R         |        know         |                       |
|    GO         |        know         |                       |
|  JAVASCRIPT   |        general      |          3Y           |

