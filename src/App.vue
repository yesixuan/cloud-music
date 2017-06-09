<template lang="html">
  <div>
    <!-- 主界面部分 -->
    <loading :show="loadingShow"></loading>
    <!-- 是否让路由页面缓存，通过路由配置里面的meta参数来控制 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 长挂在页面底部的播放区块 -->
    <player-bar v-show="songList.length">0 && !showDetail</player-bar>
  </div>
</template>

<script>
import playerBar from './components/playerBar'
import loading from './components/loading'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {playerBar, loading},
  mounted() {
    console.log('hehe')
  },
  computed: {
    ...mapGetters([
      'songList',
      'showDetail',
      'loadingShow'
    ])
  }
}
</script>

<style lang="css">
</style>
