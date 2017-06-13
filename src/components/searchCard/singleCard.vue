<template lang="html">
  <div class="single-card" @click="playAudio(data)">
    <p class="song-name" style="-webkit-box-orient:vertical">
      {{data.name}}
      <span class="transNames">{{songNameTrans}}</span>
    </p>
    <p class="source">
      <span class="singer">{{data.artists[0].name}}-</span>
      <span class="album">{{data.album.name}}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'v-single-card',
  props: {
    data: {type: Object}
  },
  methods: {
    playAudio(song) {
      document.getElementById('audioPlay').pause()
      this.$store.commit('pause')
      let audio = {}
      audio.id = song.id
      audio.singer = song.artists.name
      audio.albumPic = song.album.picUrl
      audio.name = song.name
      this.$store.commit('addToList', audio)
      this.$store.dispatch('getSong', audio.id)
    }
  },
  computed: {
    ...mapGetters(['songList']),
    songNameTrans() {
      if(this.data.transNames) {
        return '(' + this.data.transNames[0] + ')'
      }else {
        return ''
      }
    },
    albumTrans() {
      if(this.data.album && this.data.album.transNames) {
        return '(' + this.data.album.transNames[0] + ')'
      }else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus">
.single-list
  background-color #fff
  width 100%
  height 100%
  overflow auto
  ul
    list-style none
    li
      padding 5px
      border 1px solid #e1e5e4
      p.song-name
        font-size 14px
        color #2c302f
        margin-bottom 5px
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-line-clamp 1
        padding-bottom 0
        .transNames
          color #6c6e6d
      p.source
        font-size 12px
        color #6c6e6d
</style>
