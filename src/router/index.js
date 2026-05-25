import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const companymanagementList = r => require.ensure([], () => r(require('@/page/companymanagementList')), 'companymanagementList');
const todoList = r => require.ensure([], () => r(require('@/page/todoList')), 'todoList');
const systemList = r => require.ensure([], () => r(require('@/page/systemList')), 'systemList');
const departmentList = r => require.ensure([], () => r(require('@/page/departmentList')), 'departmentList');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const userInfo = r => require.ensure([], () => r(require('@/page/userInfo')), 'userInfo');
const data1 = r => require.ensure([], () => r(require('@/page/data1')), 'data1');
const data2 = r => require.ensure([], () => r(require('@/page/data2')), 'data2');
const data3 = r => require.ensure([], () => r(require('@/page/data3')), 'data3');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		meta: { authLogin: true, title: '首页' },
		children: [{
			path: '',
			component: home,
			meta: { authLogin: true, title: '首页', keepAlive: false }
		}, {
			path: '/departmentList',
			component: departmentList,
			meta: { authLogin: true, title: '部门管理', keepAlive: true }
		}, {
			path: '/userList',
			component: userList,
			meta: { authLogin: true, title: '用户管理', keepAlive: true }
		},  {
			path: '/userInfo',
			component: userInfo,
			meta: { authLogin: true, title: '账户管理', keepAlive: true }
		}, {
			path: '/companymanagementList',
			component: companymanagementList,
			meta: { authLogin: true, title: '企业管理', keepAlive: true }
		}, {
			path: '/companymanagementList',
			component: companymanagementList,
			meta: { authLogin: true, title: '企业管理', keepAlive: true }
		}, {
			path: '/todoList',
			component: todoList,
			meta: { authLogin: true, title: '诉求管理', keepAlive: true }
		}, 
		{
			path: '/data1',
			component: data1,
			meta: { authLogin: true, title: '诉求数量统计', keepAlive: true }
		},
		{
			path: '/data2',
			component: data2,
			meta: { authLogin: true, title: '单位完成统计', keepAlive: true }
		},{
			path: '/data3',
			component: data3,
			meta: { authLogin: true, title: '诉求交办统计', keepAlive: true }
		}
		
		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
