<template>
    <div class="user-card" @click="jumpUserDetail(data.userId)">
        <img v-lazy="avatarImage + '?param=200y200'" lazy="loading" class="avatarImage"/>
        <div class="avatar-info">
            <p class="avatar-name">
                {{data.nickname}}
                <span class="gender-man" v-if="data.gender === 1"><i class="man-icon"></i></span>
                <span class="gender-female" v-else><i class="female-icon"></i></span>
            </p>
            <p class="avatar-intro" style="-webkit-box-orient: vertical;">{{data.signature}}</p>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'v-user-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      jumpUserDetail(id) {
        this.$router.push({
          path: '/user/' + id
        });
      }
    },
    computed: {
      avatarImage() {
        return '' || this.data.avatarUrl;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
.user-list
  background-color #fff
  width 100%
  height 100%
  overflow auto
  ul
    list-style none
    li
      padding-left 5px
      .user-card
        display flex
        flex-direction row
        justify-content flex-start
        align-items center
        img.avatarImage
          width 0
          border-radius 50%
          flex 1 0 15%
          padding 5px 0
        .avatar-info
          flex 1 0 85%
          margin-left 5px
          border-bottom 1px solid #e1e5e4
          align-self stretch
          display flex
          flex-direction column
          justify-content center
          .avatar-name
            display flex
            justify-content flex-start
            span.gender-female
              i
                background url(../../common/images/female.svg) no-repeat
                background-size: contain
            span.gender-man
              i
                background url(../../common/images/man.svg) no-repeat
                background-size: contain
            i
              display inline-block
              width 20px
              height 20px
          .avatar-intro
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 1
            font-size 12px
            color #6c6e6d
            padding-right 10px
            
  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.2s linear
    transform translate3d(0, 0, 0)
  }
  &.fade-enter, &.fade-leave-active {
    opacity: 0
    transform translate3d(100%, 0, 0)
  }
</style>
