<template>
	<div class="playlist-card-find" @click="jumpPlayListsDetail(data.id)">
		<img v-lazy="data.picUrl + '?param=200y200'" lazy="loading" />
		<h1 style="-webkit-box-orient:vertical;">{{data.name}}</h1>
	</div>
</template>

<script>
import { playCount } from '../common/js/data'
export default {
	name: 'playListCard',
	props: {
		data: {type: Object}
	},
	methods: {
		jumpPlayListsDetail(id) {
			this.$router.push({
				path: '/playLists/' + id
			})
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.playlist-card-find
		img
			width 100%
		h1
			font-size 12px
			font-weight normal
			color #2a2e2d
			display -webkit-box
			-webkit-box-orient vertical
			-webkit-line-clamp 2
			overflow hidden
			line-height 1.2
			margin 0 3px
</style>
