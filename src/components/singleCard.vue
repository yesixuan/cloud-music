<template>
	<div class="common-single-card" @click="playAudio(data)">
		<div class="index">{{index + 1}}</div>
		<div class="single-info">
			<p class="single-name" style="-webkit-box-orient:vertical;">{{data.name}}</p>
			<p class="single-album" style="-webkit-box-orient:vertical;">{{data.al.name}}</p>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	props: {
		data: {type: Object},
		index: {type: Number}
	},
	methods: {
		playAudio(song) {
			document.getElementById('audioPlay').pause()
			this.$store.commit('pause')
			let audio = {}
			audio.id = song.id
			audio.singer = song.al.name
			audio.albumPic = song.al.picUrl
			audio.name = song.name
			this.$store.commit('addToList', audio)
			this.$store.dispatch('getSong', audio.id)
		}
	},
	computed: {
		...mapGetters(['songList'])
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.common-single-card
		display flex
		flex-direction row
		justify-content center
		align-items center
		align-content center
		.index
			flex 1 0 15%
			color #818584
			text-align center
			font-size 14px
		.single-info
			flex 1 0 85%
			display flex
			flex-direction column
			border-bottom 1px solid #e5e9e8
			padding-top 5px
			padding-bottom 5px
			align-self stretch
			.single-name
				colot #191b1a
				font-size 14px
				overflow hidden
				text-overflow ellipsis
				display -webkit-box
				-webkit-line-clamp 1
			.single-album
				colot #818584
				font-size 12px
				overflow hidden
				text-overflow ellipsis
				display -webkit-box
				-webkit-line-clamp 1
</style>
