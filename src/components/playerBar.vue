<template>
	<div class="foot">
		<div class="player-mini">
			<div class="mini-content">
				<audio :src="audio.location" @timeuptate="updateTime" @canplay="canPlaySong" @error="loadError" @ended="next" id="audioPlay"></audio>
				<div class="music-logo">
					<img v-lazy="audio.albumPic + '?param=100y100'" lazy="loading" v-show="!loading" :alt="audio.name" @click="showDetail">
				</div>
				<div class="info">
					<p class="name" style="-webkik-box-origin: vertical">{{audio.name}}</p>
					<p class="artist" style="-webkik-box-origin: vertical">{{audio.singer}}</p>
				</div>
				<div class="mini-option">
					<div class="mini-btn player-list" :class="{pause: playing}" @click="showList"></div>
					<div style="width:40px;height:40px">
						<x-circle :percent="prCurrentTime" :stroke-width="5" stroke-color="#ce332e" trail-color="#d1d1d1">
							<div class="mini-btn player" :class="{pause: playing}" @click="toggleStatus"></div>
						</x-circle>
					</div>
					<div class="mini-btn next" :class="{pause: playing}" @click="next"></div>
				</div>
			</div>
		</div>
		<toast ref="toast"></toast>
		<!-- 歌曲列表 -->
		<BottomSheet ref="bottomSheet"></BottomSheet>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { XCircle } from 'vux'
import toast from './toast'
import BottomSheet from './BottomSheet'
export default {
	components: {toast, BottomSheet, XCircle},
	data() {
		return {
			loadedTime: 0,
			playerTime: 0
		}
	},
	methods: {
		...mapMutations(['play', 'pause', 'playNext']),
		// 点击进入歌曲播放页
		showDetail() {
			this.$router.push({
				name:'player', 
				params:{
					id: this.audio.id
				}
			})
			this.$store.commit('toggleDetail')
		},
		// 点击弹出歌曲列表页
		showList() {
			this.refs.bottomSheet.show()
		},
		// 点击播放歌曲
		canPlaySong() {
			this.$store.commit('closeLoading')
			this.$store.commit('play')
			document.getElementById('audioPlay').play()
		},
		// 点击播放和暂停按钮
		toggleStatus() {
			let audioPlay = document.getElementById('audioPlay')
			if(this.playing) {
				this.$store.commit('pause')
				audioPlay.pause()
			}else{
				this.$store.commit('play')
				audioPlay.play()
			}
		},
		loadError() {
			// 判断是第一次打开应用还是后来程序加载的路径有错误，根据src是否为空来判断
			if(document.getElementById('audioPlay').currentSrc) {
				this.$refs.toast.show('歌曲路径加载错误')
				this.loading = false
				this.$store.commit('closeLoading')
				// TODO 将playBar重置下
			}
		},
		next() {
			this.toggleStatus()
			this.$store.commit('playNext')
		},
		// 更新进度条事件
		updateTime() {
			let vm = this
			let audioPlay = document.getElementById('audioPlay')
			let time = parseInt(audioPlay.currentTime)
			// 防止未加载完成时，歌曲加载错误
			audioPlay.onsuspend = function() {
				let timeRange = audioPlay.buffered
				if(timeRange.length>0 && audioPlay.duration>0) {
					vm.$store.commit('updateCurrentTime', parseInt(timeRange.end(0)))
				}
			}
			vm.$store.commit('updateDurationTime', parseInt(audioPlay.duration))
			if(this.change) {
				audioPlay.currentTime = this.tmpCurrentTime
				this.$store.commit('setChange', false)
			}else {
				this.$store.commit('updateCurrentTime', time)
			}
		}
	},
	computed: {
		...mapGetters(['audio', 'change', 'playing', 'loading', 'currentTime', 'prBufferedTime', 'tmpCurrentTime', 'prCurrentTime'])
	}
}
</script>

<style lang="less" scoped>
	 @import "../assets/theme.less";
</style>
<style lang="stylus" rel="stylesheet/stylus">
primaryColor = #ce3d3e;           // 主色
.foot
  width 100%
  position fixed
  left 0
  bottom 0
  z-index 998
  .player-mini
    background-color: rgba(255,255,255,.9)
    color: #333
    .mini-content
      display flex
      flex-direction row
      align-items center
      padding 3px
      .music-logo
        width: 56px
        height 56px
        img
          width 100%
      .info
        flex 1 0 50%
        .name
          font-size 14px
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
          color #2a2a2a
        .artist
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
          color #858585
          font-size 12px
      .mini-option
        flex 1 0 35%
        width 0
        display flex
        flex-direction row
        .mini-btn
          width 38px
          height 40px
        .player
          background url("../../static/playbar_btn_play.svg") no-repeat center
          background-size 60%
        .pause
          background url("../../static/playbar_btn_pause.svg") no-repeat center
          background-size 60%
        .player-list
          background url("../../static/playbar_btn_playlist.png") no-repeat left center
          background-size 100%
        .next
          background url("../../static/playbar_btn_next.png") no-repeat left center
          background-size 100%
</style>
