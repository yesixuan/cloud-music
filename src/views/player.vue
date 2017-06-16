<template>
	<div class="single-player">
		<div class="player-wrapper">
			<div class="header-other">
				<span @click="goBack" class="back"><i class="back-icon"></i></span>
				<div class="play-title">
					<p class="play-name" style="-webkit-box-orient:vertical">
						<span>{{audio.name}}</span>
					</p>
					<p class="play-singer" style="-webkit-box-orient:vertical">{{audio.singer}}</p>
				</div>
			</div>
			<div class="bar-line"></div>
			<div class="play-content">
				<div class="play-effect">
					<div class="cd-holder" @click="toggleShow" :class="{'cd-play':playing}" :style="{'opacity':showLyric?0:1}">
						<div class="stick"></div>
						<div class="cd-wrapper" :class="{'cd-rotate':playing}">
							<div class="cd-mask"></div>
							<img v-lazy="audio.albumPic + '?param=300y300'" lazy="loading" class="cd-img">
						</div>
					</div>
					<div @click="toggleShow" class="lyric-holder" :style="{'display':showLyric?'block':'none'}">
						<div class="lrc-inner" style="transition:-webkit-transform 0.3s ease-out;transform-origin:0 0 0;" :style="{'top':(300-42*(currentIndex+1)+'px')}">
							<p v-for="(item,index) in afterLrc" :id="index" :ley="index" :style="{'color':index===currentIndex?'#fff':'#8e9ba1'}">{{item[1]}}</p>
							<p v-show="afterLrc.length===0">没有找到歌词</p>
						</div>
					</div>
				</div>
				<div class="bottom-wrapper">
					<div class="process-bar">
						<div class="pro">
							<div class="pro-wrap">
								<mu-slider class="song-slider" @change="changeTime" v-model="prCurrentTime"></mu-slider>
							</div>
							<div class="time">
								<time id="cur">{{currentTime | time}}</time>
								<time id="total">{{durationTime | time}}</time>
							</div>
						</div>
					</div>
					<div class="control-bar">
						<div class="btn d-mode"></div>
						<div class="btn d-prev" @click="playPrev"></div>
						<div class="btn d-play btn-big" @click="togglePlay" :class="{'d-pause': playing}"></div>
						<div class="btn d-next" @click="playNext"></div>
						<div class="btn d-list" @click="showList"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="mask">
			<div class="album-cover" :style="{'background-image':'url('+audio.albumPic+'?param=500y500'+')'}"></div>
			<div class="cover-mask" style="opacity:0.6;"></div>
		</div>
		<toast ref="toast"></toast>
		<BottomSheet ref="bottomSheet"></BottomSheet>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Toast from '../components/toast'
import BottomSheet from '../components/BottomSheet'
import api from '../api'
export default {
	components: {Toast,BottomSheet},
	data() {
		return {
			afterLrc: [],
			lrcIndex: 0,
			showLyric: false,
			currentIndex: -1
		}
	},
	mounted() {
		this.loadLrc(this.$route.params.id)
	},
	// 调整歌词当前高亮位置
	watch: {
		'currentTime' (val) {
			let currentIndex = 0
			for(let i=0; i<this.afterLrc.length; i++) {
				if(val>this.afterLrc[i][0]-1) {
					currentIndex = i
				}
			}
		}
	},
	methods: {
		playNext() {
			return // TODO
		},
		toggleShow() {
			this.showLyric = !this.showLyric
		},
		togglePlay() {
			if(this.plating) {
				this.$store.commit('pause')
				document.getElementById('audioPlay').pause()
			}else {
				this.$store.commit('play')
				document.getElementById('audioPlay').play()
			}
		},
		goBack() {
			this.$router.go(-1)
			this.$store.commit('toggleDetail')
		},
		changeTime(value) { // 改变播放时间
			console.log('改变播放时间')
			let time = (value*this.durationTime) / 100
			this.$store.commit('changeTime', time)
			this.$store.commit('setChange', true)
		},
		loadLrc(id) {
			this.afterLrc = [{'txt': '正在加载中...'}]
			if(!id) {
				this.afterLrc = [{'txt': '这里显示歌词'}]
				return
			}
			api.getLyricResource(id)
			.then(res => {
				if(res.data.nolyric) {
					this.afterLrc = [{'txt': '暂无歌词'}]
				}else {
					this.afterLrc = this.parselyric(res.data.lrc.lyric)
				}
			})
			.catch(err => {
				console.log('加载错误')
			})
		},
		parselyric(lyric) {
			let lines = lyric.split('\n')
			let pattern = /\[\d{2}:\d{2}.\d{2}\]/g
			let result = []
			while (!pattern.test(lines[0])) {
				lines = lines.slice(1)
			}
			lines[lines.length-1].length === 0 && lines.pop()
			for(let data of lines) {
				let index = data.indexOf(']')
				let time = data.substring(0, index+1)
				let value = data.substring(index+1)
				let timeString = time.substring(1, time.length-2)
				let timeArr = timeString.split(':')
				result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1], value)])
			}
			console.log(result)
			result.sort((a, b) => {
				return a[0] - b[0]
			})
			return result
		},
		showList() {
			this.$refs.bottomSheet.show()
		},
		...mapMutations(['playNext', 'playPrev'])
	},
	computed: {
		...mapGetters(['currentTime', 'bufferedTime', 'durationTime', 'prCurrentTime', 'audio', 'playing', ]),
		lrcOffset() {
			if(this.afterLrc) {
				let current = Math.round(this.currentTime)
				for(let i=0; i<this.afterLrc.length; i++) {
					if(this.afterLrc[i].time === current) {
						this.lrcIndex = i
					}
				}
				return -(this.lrcIndex) * 58
			}
		}
	},
	filters: {
		time(value) {
			let length = Math.floor(parseInt(value))
			let minute = Math.floor(value / 60)
			if(minute < 10) {
				minute = '0' + minute
			}
			let second = length % 60
			if(second < 10) {
				second = '0' + second
			}
			return minute + ':' + second
		}
	}
}
</script>

<style lang="stylus">
.single-player
  .player-wrapper
    width 100%
    height 100%
    position fixed
    .header-other
      width 100%
      display flex
      flex-direction: row
      align-items center
      justify-content space-between
      background-color inherit
      height 46px
      text-align center
      span.back
        flex: 1 0 15%
        i
          display inline-block
          width 20px
          height 20px
          right 15px
          bottom 0
          cursor pointer
          background url(../common/images/back.svg) no-repeat
          background-size: contain
      .play-title
        flex: 1 0 85%
        text-align left
        .play-name
          font-size 14px
          color #fff
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
        .play-singer
          font-size 12px
          color #7893a4
          overflow hidden
          text-overflow ellipsis
          display -webkit-box
          -webkit-line-clamp 1
    .play-content
      position fixed
      width 100%
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      .play-effect
        position relative
        overflow hidden
        flex 1 0 70%
        .cd-holder
          position: relative;
          overflow: hidden;
          .stick
            position: absolute;
            width: 4rem;
            height: 6rem;
            right: 30%;
            background: url("../../static/stick_bg.png") no-repeat left -.4rem;
            background-size: cover;
            z-index: 8;
            -webkit-transition: all 300ms ease-in;
            transition: all 300ms ease-in;
            -webkit-transform-origin: left top;
            transform-origin: left top;
            -webkit-transform: rotate(-20deg);
            transform: rotate(-20deg);
          .cd-wrapper
            position: relative;
            max-width: 65%;
            min-height: 80px;
            padding: .8rem .9rem;
            border-radius: 50%;
            background: rgba(107, 107, 107, 0.3);
            margin: 3rem auto 0;
            .cd-mask
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background: url('../../static/cd_wrapper.png') no-repeat center center;
              background-size: contain;
            .cd-img
              width: 100%;
              height: 100%;
              min-height: 80px;
              border-radius: 50%;
          .cd-rotate
            -webkit-animation: rotating 10s  linear .3s infinite;
            animation: rotating 10s linear .3s infinite;
        .cd-play
          .stick
            background-position-y: -.7rem;
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
        .lyric-holder
          z-index 10
          .lrc-inner
            position: absolute;
            left: 10px;
            right: 10px;
            overflow: hidden;
            p
              overflow: hidden;
              height: 42px;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 16px;
              color: #fff;
              text-align: center;
            .on
              color: #fff;
              font-size: 16px;
      .bottom-wrapper
        color: #fff;
        width 70%
        flex: 1 0 25%;
        align-self: center;
        .control-bar
          display flex
          flex-direction row
          justify-content center
          .btn
            width: 50px;
            height: 50px;
          .d-mode
            background: url("../../static/seq.png") no-repeat;
            background-size: cover;
          .d-prev
            background: url("../../static/prev.png") no-repeat;
            background-size: cover;
          .d-play
            background: url("../../static/play.png") no-repeat;
            background-size: cover;
          .d-pause
            background: url("../../static/pause.png") no-repeat;
            background-size: cover;
          .d-next
            background: url("../../static/next.png") no-repeat;
            background-size: cover;
          .d-list
            background: url("../../static/list.png") no-repeat;
            background-size: cover;
  .bar-line
    display: block;
    bottom: 0 ;
    left: 0;
    width: 100%;
    height: 0.05rem;
    background: radial-gradient(#d3d3d3 -90%, transparent 100%);


// 进度条
.pro {
  position: relative;
}
.pro-wrap {
  margin: 0 2rem;
  padding: 1rem 0 0;
  position: relative;
}
.time {
  color: #fff;
  font-size: 12px;
  time {
    position: absolute;
    top: 54%;
    opacity: .5;
  }
  #cur {
    left: 0;
  }
  #total {
    right: 0;
  }
}
.song-slider {
  margin-bottom:0;
}

// 背景遮罩
.mask {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
.album-cover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(1.2rem);
  -webkit-filter: blur(1.2rem);
  -webkit-transform: scale(1.05);
}
.cover-mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,.8);
}


/*跑马灯样式*/
.marquee {
  position: relative;
  overflow: hidden;
  height: 30px;
}
.marquee > span {
  display: block;
  position: absolute;
  overflow: hidden;
  width: 200%;
  height: 30px;
  -webkit-animation: marquee 10s linear infinite;
  animation: marquee 10s linear infinite;
}

/* 定义一个走马灯动画 */
@-webkit-keyframes marquee {
  0% { left: 0; }
  100% { left: -100%; }
}
@keyframes marquee {
  0% { left:0; }
  100% { left: -100%; }
}

/*cd 旋转动画*/

@-webkit-keyframes rotating{
  0% { -webkit-transform:rotate(0deg); }
  100% { -webkit-transform:rotate(360deg); }
}
@keyframes rotating {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}

.fade-enter-active {
  transition: all .4s;
}
.fade-enter {
  transform: translate(100%, 0);
}
</style>
