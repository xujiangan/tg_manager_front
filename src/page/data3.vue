<template>
  <div class="fillcontain">
    <head-top>诉求交办统计</head-top>
    <el-form class="demo-form-inline" label-width="80px">
      <el-row :gutter="20" style="margin-top: 30px;padding-left:20px">
        <el-col :span="12">
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
          <el-date-picker v-model="endTime" type="date" placeholder="结束日期"/>
          <el-button @click="getAdmin">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="item-box">
            <b>诉求交办总数</b>
            <p>{{pageDate?pageDate.countSum:'/'}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item-box">
            <b>已办结</b>
            <p>{{pageDate?pageDate.countDone:'/'}}</p>
          </div>
        </el-col>
         <el-col :span="6">
          <div class="item-box">
            <b>未办结</b>
            <p>{{pageDate?pageDate.countNoDone:'/'}}</p>
          </div>
        </el-col>
         <el-col :span="6">
          <div class="item-box">
            <b>办结率</b>
            <p>{{pageDate?pageDate.countDoneRate:'/'}}</p>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin-top: 50px" :gutter="20">
       <el-col :span="6">
          <div class="item-box">
            <b>满意度：满意</b>
            <p>{{pageDate?pageDate.manyi.countManyi:'/'}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item-box">
            <b>满意度：不满意</b>
            <p>{{pageDate?pageDate.manyi.countBuManyi:'/'}}</p>
          </div>
        </el-col>
         <el-col :span="6">
          <div class="item-box">
           <b>满意度：一般</b>
            <p>{{pageDate?pageDate.manyi.countYiban:'/'}}</p>
          </div>
        </el-col>
         <!-- <el-col :span="6">
          <div class="item-box">
            <b>满意度：未填写</b>
            <p>{{pageDate?pageDate.manyi.countNoWrite:'/'}}</p>
          </div>
        </el-col> -->
        <el-col :span="6">
          <div class="item-box">
            <b>满意率</b>
            <!-- <p>{{pageDate?pageDate.manyi.countNoWrite:'/'}}</p> -->
            <p>{{pageDate?pageDate.manyi.countManyiRate:'/'}}</p> 
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getData3 } from "@/api/getData";
export default {
  data() {
    return {
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      times: "",
      keywords: "",
      typeList: [
        { value: "问题咨询", label: 0 },
        { value: "企业需求", label: 1 },
        { value: "投诉类型", label: 2 },
        { value: "意见建议", label: 3 },
      ],
      secrecyList: [
        { value: "是", label: 0 },
        { value: "否", label: 1 },
      ],
      secrecyVal: "",
      typeVal: "",
      startTime: "",
      endTime: "",
      pageDate:{}
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getAdmin();
  },
  methods: {
    async initData() {
      try {
        const countData = await adminCount();
        if (countData.status == 1) {
          // this.count = countData.count;
        } else {
          throw new Error("获取数据失败");
        }
        this.getAdmin();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getAdmin();
    },
    async getAdmin() {
      try {
        const res = await getData3({startTime:this.startTime,endTime:this.endTime});
        if (res.errCode == 0) {
          this.pageDate=res.data;   
        } else {
          throw new Error(res.msg || "error");
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";

.box-card {
  margin: 20px;
}
.item-box {
  border-radius: 4px;
  min-height: 200px;
  background: #d3dce6;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  p{
    margin-top: 15px;
  }
}
</style>