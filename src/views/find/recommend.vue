<template>
	<div class="recommend-area">
		<div id="slider">
			<swiper :options="swiperOption" style="height:100%">
				<swiper-slide v-for="item in slide_list">
					<img :src="item" class="banner-item" style="width:100%;height:100%;">
				</swiper-slide>
				<div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
			</swiper>
		</div>
		<div class="recommend-playLists-area">
			<div class="title">推荐歌单</div>
			<div class="playLists-area">
				<ul>
					<li v-for="data in playlists">
						<play-list-card :data="data"></play-list-card>
					</li>
				</ul>
			</div>
		</div>
		<div class="recommend-activitys-area">
			<div class="title">独家放送</div>
			<div class="activitys-area">
				<ul>
					<li v-for="data in activitys">
						<activity-card :data="data"></activity-card>
					</li>
				</ul>
			</div>
		</div>
		<div class="recommend-mv-area">
			<div class="title">推荐MV</div>
			<div class="MV-area">
				<ul>
					<li v-for="data in MVs">
						<mv-card :data="data"></mv-card>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import playListCard from '../../components/playListCard'
import activityCard from '../../components/activityCard'
import mvCard from '../../components/mvCard'

const imgList = [
	'/static/banner1.jpg',
	'/static/banner2.jpg',
	'/static/banner3.jpg',
	'/static/banner4.jpg',
]
export default {
	name: 'recommend',
	props: {
		playlists: {type: Array},
		activitys: {type: Array},
		MVs: {type: Array},
	},
	components: {swiper, swiperSlide, playListCard, activityCard, mvCard},
	data() {
		return{
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay: 2500,
				loop: true
			},
			slide_list: imgList
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.recommend-area
		width 100%
		height 100%
		over-flow-y auto
		.title
			padding-top 15px
			font-size 14px
			color #282c2b
			&:before
				content '|'
				color #ce3d3e
				font-size 20px
				padding-right 5px
			&:after
				content '>'
				color #848a88
				font-size 20px
				padding-right 5px
		ul
			display flex
			flex-direction row
			justify-content space-between
			flex-flow row wrap
			list-style none
		.recommend-playLists-area
			.playLists-area
				li
					padding-top 10px
					flex 0 0 33%
					width 0
		.recommend-activitys-area
			.activitys-area
				li
					padding-top 10px
					flex 0 0 49.5%
					&:last-child
						flex 0 0 100%
		.recommend-mv-area
			.MV-area
				li
					padding-top 10px
					flex 0 0 49.5%
</style>
