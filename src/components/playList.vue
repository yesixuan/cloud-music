<template lang="html">
  <div class="playlist-find" @click="jumpPlayListsDetail(data.id)">
    <img v-lazy="data.coverImgUrl + '?param=500y500'" lazy="loading" />
    <h1 style="webkit-box-orient:vertical;">{{data.name}}</h1>
    <p>by {{data.creator.nickname}}</p>
  </div>
</template>

<script>
export default {
  name: 'playList',
  props: {
    data: {type: Object}
  },
  methods: {
    jumpPlayListsDetail(id) {
      this.$router.push({
        path: '/playLists/' + id
      })
    }
  },
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style lang="stylus">
  .playlist-find
    img
      width 100%
    h1
      font-size 12px
      font-weight normal
      color #2a2e2d
      dasplay -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow hidden
      line-height 1.2
      matgin 0 3px
    p
      font-size 10px
      color #6c6e6d
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      overflow hidden
      line-height 1.2
      matgin 0 3px
</style>
