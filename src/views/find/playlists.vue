<template>
	<div class="playLists-area">
		<button-tab v-model="index">
			<button-tab-item @on-item-click="type()">最新</button-tab-item>
			<button-tab-item @on-item-click="type()">最热</button-tab-item>
		</button-tab>
		<div class="playLists">
			<ul>
				<li v-for="data in playlists">
					<play-list :data="data"></play-list>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import api from '../../api/index.js'
import { ButtonTab, ButtonTabItem } from 'vux'
import playList from '../../components/playList'
export default {
	name: 'playlists',
	components: {playList, ButtonTab, ButtonTabItem},
	data() {
		return{
			index: 0,
			keys: 'new',
			playlists: []
		}
	},
	mounted() {
		this.getTopPlaylistResource()
		console.log(this.playlists)
	},
	methods: {
		type() {
			this.getTopPlaylistResource()
		},
		getTopPlaylistResource() {
			this.keys = this.index ? 'hot' : 'new'
			this.playlists = []
			this.$store.commit('update_loading', true)
			api.getTopPlaylistResource(this.keys, 20, 0)
			.then((res) => {
				this.playlists = res.data.playlists
				// $nextTick()在dom重新渲染后执行
				this.$nextTick(() => {
					this.$store.commit('update_loading', false)
				})
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.playLists-area
		width 100%
		height 100%
		overflow-y auto
		.vux-button-group
			width 50%
			margin 10px auto
			> a.vux-button-group-current
				background #b72712
			> a.vux-button-tab-item-first
				&:after
					border 1px solid #b72712
					color #b72712
			> a.vux-button-tab-item-last
				&:after
					border 1px solid #b72712
		.playLists
			ul
				display flex
				flex-direction row
				justify-content space-between
				flex-flow row wrap
				list-style none
				li
					padding-top 10px
					flex 0 0 49%
</style>
