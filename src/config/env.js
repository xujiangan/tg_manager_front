/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://47.97.1.31:8090/zf/api';
	// baseUrl = 'http://localhost:8012/api';
    baseImgPath = '/img/';
}else{
	// baseUrl = 'http://47.97.1.31:8080';
    // baseImgPath = '//elm.cangdu.org/img/';

	// baseUrl = 'http://47.97.1.31:8091/zf/api';
	baseUrl = 'http://47.97.1.31:8090/zf/api';
    baseImgPath = '/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}