import Vue from 'vue'
import api from '../api'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isShowAsideMenu: false,
    loadingShow: false,
    audio: {
      id: 0,
      name: '歌曲名称',
      singer: '演唱者',
      albumPic: '/static/player-bar.png',
      location: '',
      album: ''
    },
    lyric: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false,
    showDetail: false,
    songList: [],
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false // 判断是更改的事件还是播放的事件
  },
  getters: {
    isShowAsideMenu: state => state.isShowAsideMenu,
    loadingShow: state => state.loadingShow,
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showDetail: state => state.showDetail,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100;
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100;
    }
  },
  mapMutations: {
    
  },
  actions: {

  }
})

export default store
