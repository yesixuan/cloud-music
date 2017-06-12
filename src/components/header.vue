<template>
	<div class="header">
    <div class="name">
      <span @click="showAsideMenu(true)" class="func"><i class="func-icon"></i></span>
      <router-link to="/index/find" class="item">
        <span class="music"><i class="music-icon"></i></span>
      </router-link>
      <span class="search"><i @click="toSearch" class="search-icon"></i></span>
    </div>
  </div>
</template>

<script>
export default {
	name: 'header',
	data() {
		return{
			index: ''
		}
	},
	methods: {
		toSearch() {
			this.$router.push('/search')
		},
		showAsideMenu(flag) {
			this.$store.commit('showAsideMenu', flag)
		}
	}
}
</script>

<style lang="less" rel="stylesheet/less">
	.header{
		position: fixed;
    top: 0;
    background-color: #B72712;
    color: #fff;
    width: 100%;
    z-index: 20;
    .name{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      span.func{
        flex: 1;
        i{
          background: url(../assets/func.svg) no-repeat;
          background-size: contain;
        }
      }
      span.search{
        flex: 1;
        i{
          background: url(../assets/search.svg) no-repeat;
          background-size: contain;
        }
      }
      .item{
        display: inline-block;
        flex: 1;
        text-align: center;
        padding-top: 5px;
        padding-bottom: 5px;
        span.music{
          flex: 1;
          i{
            background: url(../assets/music.svg) no-repeat;
            background-size: contain;
          }
        }
        span.personal{
          flex: 1;
          i{
            background: url(../assets/personal.svg) no-repeat;
            background-size: contain;
          }
        }
      }
      .item.active{
        span.music{
          i{
            background: url(../assets/music-active.svg) no-repeat;
            background-size: contain;
          }
        }
        span.personal{
          i{
            background: url(../assets/personal-active.svg) no-repeat;
            background-size: contain;
          }
        }
      }
      i{
        display: inline-block;
        width: 30px;
        height: 30px;
        right: 15px;
        bottom: 0;
        cursor: pointer;
      }
   	}
  }

</style>
