<template>
	<div class="loader" v-show="show"></div>
</template>

<script>
	export default {
		name: 'v-loading',
		props: {
			show: {
				type: Boolean
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.loader
		position: absolute
		top: calc(50% - 1.25em)
		left: calc(50% - 1.25em)
		width: 2.5em
		height: 2.5em
		transform: rotate(165deg)
		z-index: 100
		&:before,
		&:after
			content: ''
			position: absolute
			top: 50%
			left: 50%
			display: block
			width: 0.5em
			height: 0.5em
			border-radius: 0.25em
			transform: translate(-50%, -50%)
		&:before
			animation: before 2s infinite
		&:after
			animation: after 2s infinite
	@keyframes before{
		0%{
			width: 0.5em
			box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75)
		}
		35%{
			width: 2.5em
			box-shadow: 0em -0.5em rgba(225, 20, 98, 0.75), 0em 0.5em rgba(111, 202, 220, 0.75)
		}
		70%{
			width: 0.5em
			box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75)
		}
		100%{
			box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75)
		}
	}
	@keyframes after{
		0%{
			height: 0.5em
			box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), 0.5em -1em rgba(233, 169, 32, 0.75)
		}
		35%{
			height: 2.5em
			box-shadow: 0.5em 0em rgba(61, 184, 143, 0.75), 0.5em 0em rgba(233, 169, 32, 0.75)
		}
		70%{
			height: 0.5em
			box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), 0.5em 1em rgba(233, 169, 32, 0.75)
		}
		100%{
			box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), 0.5em -1em rgba(233, 169, 32, 0.75)
		}
	}
</style>