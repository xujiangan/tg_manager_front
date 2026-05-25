import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import {getStore} from './config/mUtils'
import 'element-ui/lib/theme-chalk/index.css'

import service from './config/fetch'
Vue.prototype.$http = service;
Vue.use(ElementUI);
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
	const adminInfos=JSON.parse(getStore('adminInfo'));
	/* 路由发生变化修改页面title */
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	if (to.matched.some(r => r.meta.authLogin)){  // 判断该路由是否需要登录权限
	  if (adminInfos) {  // 判断当前的adminInfos是否存在
		next();
	  }
	  else {
		next({
		  path: '/',
		  query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
		})
		document.title = "登录";
	  }
	}
	else {
	  next();
	}
  });
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
