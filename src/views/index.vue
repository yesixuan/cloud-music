<template>
	<transition name="fade">
		<div class="index">
			<!-- 侧边栏 -->
			<AsideMenu v-show="isShowAsideMenu"></AsideMenu>
			<!-- 头部 -->
			<VHeader></VHeader>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
import VHeader from '../components/header.vue'
import AsideMenu from '../components/asideMenu/asideMenu'
export default {
	components: {VHeader, AsideMenu},
	computed: {
		isShowAsideMenu() {
			return this.$store.state.isShowAsideMenu;
		}
	}
}
</script>

<style>
	.fade-enter-active, .fade-leave-active{
		transition: all .4s;
	}
	.fade-enter, .fade-leave{
		transform: translate(100%, 0)
	}
</style>
