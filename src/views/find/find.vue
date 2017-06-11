<template>
	<transition name="fade">
		<div class="find-page">
			<!-- 顶部tab栏 -->
			<tab :line-width="2" active-color="#b72712" defaultColor="#666" bar-active-color="#b72712" v-model="index">
				<tab-item class="vux-center" :selected="type===item" v-for="(item,index) in tabList" @click="type=item" :key="index" style="background-color:#fdfffe;">{{item}}</tab-item>
			</tab>
			<!-- tab栏对应的内容 -->
			<swiper v-model="index" height="100%" :show-dots="false" class="swiper-container" style="width:100%;height:100%;padding-bottom:90px;background-color:#eef2f1;">
				<swiper-item :key="1">
					<div class="tab-swiper vux-center">
						<recommend :playlists="playlists" :activitys="activitys" :MVs="MVs"></recommend>
					</div>
				</swiper-item>
				<swiper-item :key="2">
					<div class="tab-swiper vux-center">
						<play-lists></play-lists>
					</div>
				</swiper-item>
				<swiper-item :key="3">
					<div class="tab-swiper vux-center">
						<ranking></ranking>
					</div>
				</swiper-item>
			</swiper>
		</div>
	</transition>
</template>

<script>
import api from '../../api/index.js'
import { Tab, TabItem } from 'vux/src/components/Tab'
import { Swiper, SwiperItem } from 'vux/src/components/Swiper'
import recommend from './recommend'
import playLists from './playlists'
import ranking from './ranking'

const list = () => ['个性推荐', '歌单', '排行榜']
export default {
	name: 'find',
	components: {playLists, recommend, ranking, Tab, TabItem, Swiper, SwiperItem},
	data() {
		return {
			index: 0,
			tabList: list(),
			type: '个性推荐',
			playlists: [],
			activitys: [],
			MVs: []
		}
	},
	mounted() {
		this.getPersonalizedResource(),
		this.getPrivatecontenResource(),
		this.getPersonalizedMvResource()
	},
	methods: {
		getPersonalizedResource() {
			api.getPersonalized()
			.then((res) => {
				this.playlists = res.data.result
			})
			.catch((res) => {
				console.log(res)
			})
		},
		getPrivatecontenResource() {
			api.getPrivatecontent()
			.then((res) => {
				this.activitys = res.data.result
			})
			.catch((res) => {
				console.log(res)
			})
		},
		getPersonalizedMvResource() {
			api.getPersonalizedMv()
			.then((res) => {
				this.MVs = res.data.result
			})
			.catch((res) => {
				console.log(res)
			})
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../assets/theme.styl";
	.find-page
		position fixed
		width 100%
		height 100%
		top 46px
		.vux-swiper
			height 100%
			overflow initial
			padding-bottom 90px
		.vux-swiper-item
			overflow-y auto
</style>