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
    <player v-show="songList.length">0 && !showDetail</player>
  </div>
</template>

<script>
import player from './components/playerBar/playerBar'
import loding from './components/loading/loading'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {player, loading},
  mounted() {
    console.log('hehe haha')
  },
  computed: {
    ...mapGetters([
      'songList',
      'showDetail',
      'loadingShow',
    ])
  }
}
</script>

<style lang="css">
</style>
