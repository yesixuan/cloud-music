<template>
    <div class="playlist-card" @click="jumpPlayListsDetail(data.id)">
        <img v-lazy="coverImage + '?param=200y200'" lazy="loading" class="coverImage"/>
        <div class="playList-info">
            <p class="playList-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
            <p class="playList-info-other">
                <span class="playList-count">{{data.trackCount}}首</span>
                <span class="playList-creator">by {{data.creator.nickname}}</span>
                <span class="playList-playCount">播放{{data.playCount | playCount}}次</span>
            </p>
        </div>
    </div>
</template>
<script>
  import { playCount } from '../../common/js/data';
  export default {
    name: 'v-play-list-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      jumpPlayListsDetail(id) {
        this.$router.push({
          path: '/playLists/' + id
        });
      }
    },
    computed: {
      coverImage() {
        return '' || this.data.coverImgUrl;
      }
    },
    filters: {
      playCount(count) {
        return playCount(count);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.play-lists
  background-color #fff
  width 100%
  height 100%
  overflow auto
  ul
    list-style none
    li
      padding-left 5px
      .playlist-card
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        img.coverImage
          width 0
          flex 1 0 15%
          padding 5px 0
        .playList-info
          flex 1 0 85%
          margin-left 5px
          border-bottom 1px solid #e1e5e4
          align-items flex-start
          align-self stretch
          justify-content center
          display flex
          flex-direction column
          .playList-name
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
          .playList-info-other
            display flex
            justify-content flex-start
            font-size 12px
            color #6c6e6d
            span
            padding-right 5px
</style>
