<template>
	<transition name="fadeIn">
		<div class="aside-menu">
				<i @click="showAsideMenu" class="back"></i>
				<div class="aside">
					<div class="info">
						<img src="https://yesixuan.github.io/images/avatar.jpg" alt="">
						<p class="author">消泼茶香</p>
					</div>
				</div>
				<div @click.stop.prevent="showAsideMenu" class="mask"></div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'asideMenu',
	data() {
		return{
			isSignIn: false
		}
	},
	methods: {
		showAsideMenu() {
			this.$store.commit('showAsideMenu', false)
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.fadeIn-enter-active {
	transition: all .4s ease;
}
.fadeIn-leave-active {
	transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeIn-enter, .fadeIn-leave-active {
	transform: translateX(-250px);
	opacity: 0;
}
.aside-menu
	width 100%
	height 100%
	position absolute
	top 0
	left 0
	bottom 0
	right 0
	display flex
	z-index 99
	i.back
		display inline-block
		position absolute
		right 25%
		top 10px
		background url('./back.svg') no-repeat
		width 20px
		height 20px
		background-size contain
	.aside
		flex 1 0 80%
		background-color #fff
	.mask
		flex: 1 0 20%
	.info
		display flex
		flex-direction row
		align-items center
		padding 20px
		background url('http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg') no-repeat left center
		background-size cover
		box-shadow 2px 0 10px gray
		img
			margin-right 15px
			width 100px
			height 100px
			border-radius 50%
		.author
			color #fff
			font-size 16px
</style>
