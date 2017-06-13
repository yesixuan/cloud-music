<template>
  <div class="singer-card" @click="jumpSingerDetail(data.id)">
    <img v-lazy="avatarImage + '?param=200y200'" lazy="loading" class="avatar"/>
    <p class="singer-name">
      <span class="name" style="-webkit-box-orient: vertical;">{{data.name}}</span>
      <span class="trans" v-show="data.trans">({{data.trans}})</span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'v-singer-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      jumpSingerDetail(id) {
        this.$router.push({
          path: '/singer/' + id
        });
      }
    },
    computed: {
      avatarImage() {
        return '' || this.data.picUrl;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.singer-list
  background-color #fff
  width 100%
  height 100%
  overflow auto
  ul
    list-style none
    li
      padding-left 5px
      .singer-card
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        img.avatar
          width 0
          flex 1 0 15%
          padding 5px 0
        .singer-name
          flex 1 0 85%
          margin-left 5px
          border-bottom 1px solid #e1e5e4
          align-items center
          align-self stretch
          display flex
          flex-direction row
          justify-content: flex-start
          .trans
            font-size 12px
            color #6c6e6d
</style>
