<template lang="html">
  <div @click="jumpAlbumDetail(data.id)" class="album-card">
    <img v-lazy="albumImage + '?param=200y200'" lazy="loading" class="album-image" />
    <div class="album-info">
      <p class="album-name" style="-webkit-box-orient:vertical">
        {{data.name}}
        <span class="trans">{{albumTrans}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-album-card',
  props: {
    data: {type: Object}
  },
  methods: {
    jumpAlbumDetail(id) {
      this.$router.push({
        path: '/album/' + id
      })
    }
  },
  computed: {
    albumImage() {
      return '' || this.data.picUrl
    },
    albumTrans() {
      if(this.data.alias && this.data.alias[0]) {
        return '(' + this.data.alias[0] + ')'
      }else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus">
.album-list
  background-color #fff
  width 100%
  height 100%
  overflow auto
  ul
    list-style none
    li
      padding-left 5px
      .album-card
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        img.album-image
          width 0
          flex 1 0 15%
          padding 5px 0
        .album-info
          align-self stretch
          display flex
          flex-direction column
          justify-content center
          flex 1 0 85%
          margin-left 5px
          padding-right 5px
          border-bottom 1px solid #e1e5e4
          .album-name
            font-size 14px
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
          .album-author
            font-size 12px
            color #6c6e6d
</style>
