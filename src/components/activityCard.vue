<template>
	<div class="active-card-find">
		<img v-lazy="data.picUrl + '?param=400y200'" lazy="loading" />
		<h1 style="-webkit-box-orient:vertical;">{{data.name}}</h1>
	</div>
</template>

<script>
import { playCount } from '../common/js/data'
export default {
	name: 'activityCard',
	props: {
		data: {type: Object}
	},
	filters: {
		playCount(count) {
			return playCount(count)
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.active-card-find
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