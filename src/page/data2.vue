<template>
  <div class="fillcontain">
    <head-top>单位完成统计</head-top>
    <el-form class="demo-form-inline" label-width="80px">
      <el-row :gutter="20" style="margin-top: 30px">
        <el-col :span="6">
         <el-form-item>
            <el-input
              placeholder="单位名称"
              v-model="keywords"
            ></el-input>
          </el-form-item>
         
        </el-col>
        <el-col :span="12">
         
          <el-date-picker
            v-model="startTime"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
          <el-date-picker v-model="endTime" type="date" placeholder="结束日期">
          </el-date-picker>
          <el-button>查询</el-button>
          <!-- <el-button>批量导出</el-button> -->
        </el-col>
      </el-row>
    </el-form>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="单位名称"> </el-table-column>
        <el-table-column prop="totalCount" label="总分配数"> </el-table-column>
        <el-table-column prop="successDoneCount" label="按时完成"> </el-table-column>
        <el-table-column prop="moreTimeDoneCount" label="延时完成"> </el-table-column>
        <el-table-column prop="noCount" label="未完成"> </el-table-column>
        <el-table-column prop="chexiaoCount" label="退回数"> </el-table-column>
        <el-table-column prop="backCount" label="撤销数"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getData2 } from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      times: "",
      keywords:'',
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
    };
  },
  components: {
    headTop,
  },
  created() {
    this.getAdmin();
  },
  methods: {
    typeChange(e) {
      console.log(e);
    },
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
        const res = await getData2({
          page: this.currentPage,
          count: this.limit,
        });
        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.tableData = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              totalCount: item.count,
              name: item.name,
              totalCount:item.totalCount,
              chexiaoCount:item.chexiaoCount,
              backCount:item.backCount,
              noCount:item.noCount,
              successDoneCount:item.successDoneCount,
              moreTimeDoneCount:item.moreTimeDoneCount,
            };
            this.tableData.push(tableItem);
          });
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

.table_container {
  padding: 20px;
}
</style>