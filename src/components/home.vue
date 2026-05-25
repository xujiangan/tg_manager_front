<template>
    <div>
        <head-top></head-top>
		<section class="data_section">
			<header class="section_title">欢迎【{{admin.accountName}}】</header>
			<br/>
			<br/>
			<br/>
			<!-- <header class="section_title">数据统计</header>
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4"><div class="data_list today_head">总计诉求：<span class="data_num head">{{count||0}}</span></div></el-col>
				<el-col :span="4"><div class="data_list">本日诉求：<span class="data_num">{{nowCount||0}}</span> </div></el-col>
				<el-col :span="4"><div class="data_list">本月诉求：<span class="data_num">{{monthCount||0}}</span> </div></el-col>
                <el-col :span="4"><div class="data_list">本年诉求：<span class="data_num">{{yearCount||0}}</span> </div></el-col>
			</el-row> -->
			<!-- <header class="section_title_ti">二维码</header> -->
			<el-row :gutter="20" style="margin-bottom: 10px;">
                <el-col :span="4">
					<img class="codeewm" src="./../assets/img/ma0.png" alt="">
				</el-col>
				 <el-col :span="4">
					<img class="codeewm" src="./../assets/img/ma1.png" alt="">
				</el-col>
				 <el-col :span="4">
					<img class="codeewm" src="./../assets/img/ma2.png" alt="">
				</el-col>
			</el-row>
		</section>
		<!-- <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency> -->
    </div>
</template>

<script>
	import headTop from '../components/headTop'
	import tendency from '../components/tendency' 
	
import { getStore } from "./../config/mUtils";	
    import { queryStaticCount } from '@/api/getData'
    export default {
    	data(){
    		return {
    			count: null,
    			nowCount: null,
                monthCount: null,
                yearCount: null,
				admin:{},
    		}
    	},
    	components: {
    		headTop,
    		tendency,
    	},
    	mounted(){
			 this.admin = JSON.parse(getStore("adminInfo"));
			//   this.initData();
    	},
		created() {
            // this.initData();
        },
		
    	methods: {
    		async initData(){
    			// const today = dtime().format('YYYY-MM-DD')
    			// Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
    			// .then(res => {
    			
    			// }).catch(err => {
    			// 	console.log(err)
    			// })
			// "dayByCount": 2, 当日新增
            // "monthByCount": 2, 当月新增
            // "yearByCount": 2, 当年新增
            // "totalCount": 3 总计
				try {
                    const res = await queryStaticCount();
                    if (res.errCode == 0) {
						this.count = res.data.totalCount;
						this.nowCount = res.data.dayByCount;
						this.monthCount = res.data.monthByCount;
						this.yearCount = res.data.yearByCount;
                        
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
    		},
    	}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.data_section{
		padding: 20px;
		margin-bottom: 40px;
		.section_title{
			text-align: left;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.section_title_ti{
			margin-top: 50px;
			font-size: 30px;
			margin-bottom: 10px;
		}
		.codeewm{
			width: 180px;
			height: 180px;
		}
		.data_list{
			text-align: center;
			font-size: 14px;
			color: #666;
            border-radius: 6px;
			line-height: 40px;
            background: #E5E9F2;
            .data_num{
                color: #333;
                font-size: 26px;

            }
            .head{
                border-radius: 6px;
                font-size: 22px;
                padding: 4px 0;
                color: #fff;
                display: inline-block;
            }
        }
        .today_head{
            background: #FF9800;
        }
        .all_head{
            background: #20A0FF;
        }
	}
    .wan{
        .sc(16px, #333)
    }
</style>
