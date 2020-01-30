import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      num: 0 || localStorage.getItem('num'),//显示dateils页面的选项
    },
    mutations:{
     
    },
    getters:{

    },
    actions:{

    }
})
