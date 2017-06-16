<template>
	<transition name="fade">
    <div class="playlist">
      <div class="fixed-title" :style="{'background': 'rgba(183, 39, 18, '+ opacity +')'}" style="transition: opacity .1s;">
        <x-header :left-options="{backText: ''}" style="background-color:transparent">{{tName}}</x-header>
      </div>
      <div class="playlist-info" :style="{'background-image': 'url(' + playListImage + '?param=500y500'+ ')'}">
        <div class="playlist-info-blur">
            <div class="playlist-intro">
              <img v-lazy="playListImage"  class="playlist-image" lazy="loading" alt="photo">
              <div class="playlist-intro-other">
                <p class="playlist-title" style="-webkit-box-orient: vertical;">{{datas.name}}</p>
                <div class="playlist-creator"  @click="jumpUserDetail(creator.userId)">
                  <img v-lazy="creatorImage + '?param=100y100'" lazy="loading">
                  <span class="playlist-nickname" style="-webkit-box-orient: vertical;">{{creator.nickname}}</span>
                  <span class="more"> > </span>
                </div>
              </div>
            </div>
            <div class="playlist-status">
              <div class="playCount">
                <span class="file"><i class="icon-file"></i></span>
                <span>{{datas.playCount}}</span>
              </div>
              <div class="commentCount">
                <span class="comment"><i class="icon-comment"></i></span>
                <span>{{datas.commentCount}}</span>
              </div>
              <div class="shareCount">
                <span class="share"><i class="icon-share"></i></span>
                <span>{{datas.shareCount}}</span>
              </div>
            </div>
        </div>
      </div>
      <div class="play-list">
          <ul>
            <li v-for="(data, index) in list">
                <v-single-card :data="data" :index="index"></v-single-card>
            </li>
          </ul>
      </div>
    </div>
  </transition>
</template>

<script>
import api from '../api/index.js'
import { XHeader } from 'vux'
import vSingleCard from '../components/singleCard'
export default {
	components: {XHeader, vSingleCard},
	beforeRouterEnter(to, from, next) {
		next(vm => {
			window.onscroll = () => {
				let opa = window.pageYOffset / 222
				if(opa > 1) {
					vm.tName = vm.datas.name
					vm.opacity = 1
				}else {
					vm.tName = '歌单'
					vm.opacity = 0
				}
			}
		})
	},
	beforeRouterLeave(to, from, next) {
		window.onscroll = null
		next()
	},
	data() {
		return {
			datas: {},
			tName: '歌单',
			creator: {},
			data: [],
			index: '',
			list: [],
			backgroundColor: '',
			opacity: 0
		}
	},
	mounted() {
		this.getPlayListDetail()
	},
	methods: {
		jumpUserDetail(id) {
			this.$router.push({
				path: '/user/'+id
			})
		},
		getPlayListDetail() {
			this.$store.commit('update_loading', true)
			api.getPlayListDetailResource(this.$route.params.id)
			.then((res) => {
				this.datas = res.data.playlist
				this.list = res.data.playlist.tracks
				this.creator = res.data.playlist.creator
				this.$nextTick(() => {
					this.$store.commit('update_loading', false)
				})
			})
			.catch(err => {
				console.log('加载歌单出错'+err)
			})
		}
	},
	computed: {
		playListImage() {
			return '' || (this.datas.picUrl)
		},
		creatorImage() {
			return '' || (this.creator.avatarUrl)
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.playlist
  width 100%
  height 100%
  overflow-y auto
  .fixed-title
    position fixed
    width 100%
    height 46px
    z-index 2
  .playlist-info,
  .playlist-info-blur::before
    background url('../assets/loading.jpg') 0 / cover fixed;
  .playlist-info-blur::before
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    filter blur(20px)
    margin -30px
    z-index -1
  .playlist-info
    .playlist-info-blur
      position relative
      background rgba(0, 0, 0, 0.8)
      overflow hidden
      .playlist-intro
        display flex
        flex-direction row
        padding 46px 15px 12px
        .playlist-image
          width 0
          height 100%
          flex 1 0 35%
        .playlist-intro-other
          color #fff
          padding-left 15px
          padding-top 8px
          flex 1 0 65%
          line-height 1.2
          .playlist-title
            display block
            font-size 14px
            margin-bottom 15px
            overflow hidden
            text-overflow ellipsis
            display -webkit-box
            -webkit-line-clamp 2
          .playlist-creator
            display flex
            flex-direction row
            align-items center
            .playlist-nickname
              overflow hidden
              text-overflow ellipsis
              display -webkit-box
              -webkit-line-clamp 1
              padding-right 10px
            .more
              color #fff
              font-size 12px
            img
              width 30px
              height 30px
              border-radius 50%
            span
              font-size 12px
              padding-left 5px
      .playlist-status
        display flex
        flex-direction row
        justify-content space-around
        align-items center
        text-align: -webkit-center;
        text-align center
        color #fff
        padding-bottom 6px
        span
          display block
        span.file
          i
            background url(../common/images/file.svg) no-repeat
            background-size: contain
        span.comment
          i
            background url(../common/images/comment.svg) no-repeat
            background-size: contain
        span.share
          i
            background url(../common/images/share.svg) no-repeat
            background-size: contain
        i
          display inline-block
          width 30px
          height 30px
          cursor pointer
  .play-list
    ul
      list-style none
// 过渡效果
.fade-enter-active, .fade-leave-active {
  transition: all .4s;
}
.fade-enter, .fade-leave {
  transform: translate(100%, 0);
}

</style>
