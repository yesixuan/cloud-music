<template>
	<div class="ranking-area">
		<div class="surge">
			<img v-lazy="surgeInfo.coverImgUrl" lazy="loading">
			<ul>
				<li style="-webkit-box-orient:vertical" v-for="(data, index) in surgeList">
					{{index + 1}}-{{data.name}}-{{data.artists[0].name}}
				</li>
			</ul>
		</div>
		<div class="newSonges">
			<img v-lazy="newSongesInfo.coverImgUrl + '?param=200y200'" lazy="loading">
			<ul>
				<li style="-webkit-box-orient:vertical" v-for="(data, index) in newSongesList">
					{{index + 1}}-{{data.name}}-{{data.artists[0].name}}
				</li>
			</ul>
		</div>
		<div class="original">
			<img v-lazy="originalInfo.coverImgUrl" lazy="loading">
			<ul>
				<li style="-webkit-box-orient:vertical" v-for="(data, index) in originalList">
					{{index + 1}}-{{data.name}}-{{data.artists[0].name}}
				</li>
			</ul>
		</div>
		<div class="hot">
			<img v-lazy="hotInfo.coverImgUrl" lazy="loading">
			<ul>
				<li style="-webkit-box-orient:vertical" v-for="(data, index) in hotList">
					{{index + 1}}-{{data.name}}-{{data.artists[0].name}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import api from '../../api/index.js'
export default {
	name: 'ranking',
	data() {
		return{
			surgeList: [],
			newSongesList: [],
			originalList: [],
			hotList: [],
			surgeInfo: {},
			newSongesInfo: {},
			originalInfo: {},
			hotInfo: {}
		}
	},
	mounted() {
		this.getSurgeList()
		this.getNewSongesList()
		this.getOriginalList()
		this.getHotList()
	},
	methods: {
		getSurgeList() {
			api.getTopListResource(3)
			.then(res => {
				this.surgeInfo = res.data.result
				this.surgeList = res.data.result.tracks.slice(0, 3)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getNewSongesList() {
			api.getTopListResource(0)
			.then(res => {
				this.newSongesInfo = res.data.result
				this.newSongesList = res.data.result.tracks.slice(0, 3)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getOriginalList() {
			api.getTopListResource(2)
			.then(res => {
				this.originalInfo = res.data.result
				this.originalList = res.data.result.tracks.slice(0, 3)
			})
			.catch(err => {
				console.log(err)
			})
		},
		getHotList() {
			api.getTopListResource(1)
			.then(res => {
				this.hotInfo = res.data.result
				this.hotList = res.data.result.tracks.slice(0, 3)
			})
			.catch(err => {
				console.log(err)
			})
		},
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ranking-area
		width 100%
		height 100%
		overflow-y auto
		padding-top 10px
		display flex
		flex-direction column
		justify-content center
		> div
			display flex
			flex-direction row
			padding 2px 0
			img
				flex 1 0 30%
				height 130px
			ul
				flex 1 0 70%
				display flex
				flex-direction column
				justify-content space-around
				list-style none
				color #616765
				padding-left 10px
				border-bottom 1px solid #d6dad9
				font-size 12px
				padding-right 5px
				li
					display -webkit-box
					-webkit-box-orient vertical
					overflow hidden
</style>
