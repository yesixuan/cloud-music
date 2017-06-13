<template>
	<transition>
		<div class="search-page">
			<div class="header-other">
				<span @click="goBack" class="back">
					<i class="back-icon"></i>
				</span>
				<div class="input">
					<input v-model="keywords" @keyup.enter="toSearch(keywords)" type="text" placeholder="搜索音乐、歌手、歌词、用户">
					<i @click="keywords=''" v-show="keywords!=='' && !isShowHot" class="icon-cancle"></i>
				</div>
			</div>
			<div class="hot" v-if="isShowHot">
				<p>热门搜索</p>
				<ul class="keywords">
					<li v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keywords"></li>
				</ul>
			</div>
			<div v-else class="search-list">
				 <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
					 <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}
					 </tab-item>
				 </tab>
				 <swiper v-model="index" height="100%" :show-dots="false" class="swiper-container">
					 <swiper-item :key="1">
						 <div class="tab-swiper vux-center">
							 <div class="single-list">
								 <ul>
									 <li v-for="data in songs">
										 <v-single-card :data="data"></v-single-card>
									 </li>
								 </ul>
							 </div>
						 </div>
					 </swiper-item>
					 <swiper-item :key="2">
						 <div class="tab-swiper vux-center">
							 <div class="singer-list">
								 <ul>
									 <li v-for="data in singer">
										 <v-singer-card :data="data"></v-singer-card>
									 </li>
								 </ul>
							 </div>
						 </div>
					 </swiper-item>
					 <swiper-item :key="3">
						 <div class="tab-swiper vux-center">
							 <div class="album-list">
								 <ul>
									 <li v-for="data in albums">
										 <v-album-card :data="data"></v-album-card>
									 </li>
								 </ul>
							 </div>
						 </div>
					 </swiper-item>
					 <swiper-item :key="4">
						 <div class="tab-swiper vux-center">
							 <div class="play-lists">
								 <ul>
									 <li v-for="data in playlist">
										 <v-play-list-card :data="data"></v-play-list-card>
									 </li>
								 </ul>
							 </div>
						 </div>
					 </swiper-item>
					 <swiper-item :key="5">
						 <div class="tab-swiper vux-center">
							 <div class="user-list">
								 <ul>
									 <li v-for="data in user">
											 <v-user-card :data="data"></v-user-card>
									 </li>
								 </ul>
							 </div>
						 </div>
					 </swiper-item>
				 </swiper>
			 </div>
		</div>
	</transition>
</template>

<script>
import api from '../api/index'
import { Tab, TabItem } from 'vux/src/components/Tab'
import { Swiper, SwiperItem } from 'vux/src/components/Swiper'
import vSingleCard from '../components/searchCard/singleCard'
import vSingerCard from '../components/searchCard/singerCard'
import vAlbumCard from '../components/searchCard/albumCard'
import vPlayListCard from '../components/searchCard/playListCard'
import vUserCard from '../components/searchCard/userCard'
const list = () => ['单曲', '歌手', '专辑', '歌单', '用户']
const hotKeywordsList = () => ['向死而生', 'burning', '林俊杰', '不为谁而作的歌', '最佳歌手', '极乐净土', '成都', '为你而唱', '陈奕迅', '古风悠扬', '玄觞', '我的梦', '给未来的自己', '龙卷风', ]
	export default {
		name: 'search',
		components: {Tab, TabItem, Swiper, SwiperItem, vSingleCard, vSingerCard, vAlbumCard, vPlayListCard, vUserCard},
		data() {
			return {
				index: 0,
				tabList: list(),
				hotKeywords: hotKeywordsList(),
				type: '单曲',
				keywords: '',
				isShowHot: true,
				songs: {},
				singer: {},
				albums: {},
				playlist: {},
				user: {}
			}
		},
		watch: {
			'$route' (to, from) {
        if (from.name === 'find') {
            this.keywords = '';
            this.isShowHot = true;
        }
			}
		},
		methods: {
			goBack() {
				this.$router.push({
					path: 'index/find'
				})
			},
			toSearch(keywords) {
				this.keywords = keywords
				if(this.keywords.trim()) {
					this.isShowHot = false
					this.$router.push({
						path: '/search',
						query: {
							keywords: keywords
						}
					})
					this.getSingleResource()
					this.getAlbumResource()
					this.getSingerResource()
					this.getPlayListResource()
					this.getUserResource()
				}
			},
			getSingleResource() {
				this.$store.commit('update_loading', true)
				api.getSearchResource(this.$route.query.keywords, 1, 30, 0)
				.then(res => {
					this.songs = res.data.result.songs
					this.$nextTick(() => {
						this.$store.commit('update_loading', false)
					})
				})
				.catch(err => {
					console.log(err)
				})
			},
			getAlbumResource() {
				api.getSearchResource(this.$route.query.keywords, 10, 30, 0)
				.then(res => {
					this.albums = res.data.result.albums
				})
				.catch(err => {
					console.log(err)
				})
			},
			getSingerResource() {
				api.getSearchResource(this.$route.query.keywords, 100, 30, 0)
				.then(res => {
					this.singer = res.data.result.artists
				})
				.catch(err => {
					console.log(err)
				})
			},
			getPlayListResource() {
				api.getSearchResource(this.$route.query.keywords, 1000, 30, 0)
				.then(res => {
					this.playlist = res.data.result.playlists
				})
				.catch(err => {
					console.log(err)
				})
			},
			getUserResource() {
				api.getSearchResource(this.$route.query.keywords, 1002, 30, 0)
				.then(res => {
					this.user = res.data.result.userprofiles
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/center.less";
.vux-swiper{
	height: 100%;
}
.vux-slider{
	height: 100%;
}
.tab-swiper{
	background-color: #fff;
	height: 100%;
}
</style>

<style lang="stylus" rel="stylesheet/">
.search-page
	position: fixed
	width 100%
	height 100%
	z-index: 99
	padding-bottom 100px
	.header-other
		position: relative
		flex 2
		width: 100%
		z-index: 2
		display flex
		flex-direction: row
		align-items: center
		justify-content space-between
		text-align center
		padding-top: 5px
		padding-bottom: 5px
		background-color: #B72712
		span.back
			flex: 3
			i
				display inline-block
				width 20px
				height 20px
				right 15px
				bottom 0
				cursor pointer
				background url(../common/images/back.svg) no-repeat
				background-size: contain
		.input
			flex: 17
			margin-left: 10px
			margin-right: 10px
			border-bottom: 1px solid #fff;
			input
				width 100%
				height 35px
				font-size: 14px
				border 0
				outline 0
				background-color: #B72712
				color: #ffbeb7
				text-decoration: none
		::-webkit-input-placeholder { /* WebKit browsers */
			color: #ffbeb7;
			}
			:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
			color: #ffbeb7;
			}
			::-moz-placeholder { /* Mozilla Firefox 19+ */
			color: #ffbeb7;
			}
			:-ms-input-placeholder { /* Internet Explorer 10+ */
			color: #ffbeb7;
			}
	.hot
		flex 8
		padding 10px
		color #6c706f
		.keywords
			display flex
			flex-wrap wrap
			padding-top 10px
			list-style none
			font-size 12px
			color #232726
			.keyword
				text-align center
				padding 3px 10px
				margin-right 10px
				margin-bottom 10px
				border-radius 20px
				cursor pointer
				border 1px solid #ccd0cf
				background-color: #fff
			.keyword:hover
				color #fff
				background-color #ccd0cf
	.search-list
		width:100%
		height: 100%
		.history
			display flex
			width 100%
			height 50px
			justify-content center
			align-items center
			border-top 1px solid rgba(0, 0, 0, .1)
			.icon
				flex 1
				height 100%
				display flex
				justify-content center
				align-items center
			.icon-history
				display inline-block
				width 23px
				height 23px
				background url('../common/images/history.svg') no-repeat
				background-size contain
			.icon-del
				display inline-block
				width 20px
				height 20px
				background url('../common/images/del.svg') no-repeat
				background-size contain
			.word
				flex 5
				width 80%
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
		.tips
			text-align center
			margin 12px auto
			width 200px
			font-size: 80%
			color gray
		.loading
			padding-top 10px
			text-align center
			.icon-loading
				display inline-block
				margin auto
				width 22px
				height 22px
				background url('../common/images/loading.svg') no-repeat
				background-size contain
				animation loading .6s linear infinite
				vertical-align text-top
				margin-right 10px
		.music + .music
			border-top 1px solid rgba(0, 0, 0, .1)
		.music
			display flex
			width 100%
			height 60px
			cursor pointer
			.icon-music
				display flex
				justify-content center
				align-items center
				width 60px
				height 60px
				img
					display inline-block
					width 90%
					height 90%
					background url(../common/images/music.svg) no-repeat
					background-size contain
			.music-info
				position relative
				flex 1
				padding 8px 10px
				.music-name
					width 250px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
				.music-singer
					padding-top 3px
					font-size 50%
					color gray
				i
					position absolute
					display inline-block
					width 13px
					height 13px
				i.icon-listening
					background url('../common/images/listening.svg') no-repeat
					background-size contain
					right 20px
					top 22px
					animation listening 1s linear infinite
				i.icon-love
					background url('../common/images/love.svg') no-repeat
					background-size contain
					right 40px
					top 20px
	.fade-enter-active,
	.fade-leave-active
		transition all .4s;
	.fade-enter,
	.fade-leave
		transform translate(100%, 0)
</style>
