<template>
  <div class="fillcontain">
    <head-top>诉求数量统计</head-top>
    <el-form class="demo-form-inline" label-width="80px">
      <el-row :gutter="20" style="margin-top: 30px">
        <!-- <el-col :span="6">
          <el-form-item>
            <el-select
              v-model="typeVal"
              @change="typeChange"
              clearable
              placeholder="投诉类型"
            >
              <el-option
                v-for="item in typeList"
                :key="item.label"
                :label="item.value"
                :value="item.value"
              >
              </el-option> </el-select
          ></el-form-item>
        </el-col> -->
        <el-col :span="18">
         <el-form-item>
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
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="typeName" label="类型"> </el-table-column>
        <el-table-column prop="totalCount" label="数量"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getData1 } from "@/api/getData";
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
      typeList: [
        { value: "问题咨询", label: 0 },
        { value: "企业需求", label: 1 },
        { value: "投诉举报", label: 2 },
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
        const res = await getData1({
          startTime: this.startTime,
          endTime: this.endTime,
        });
        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.tableData = [];
          var item = res.data;
          const tableItem0 = {
            totalCount: item.totalCount,
            typeName: "总计",
          };
          this.tableData.push(tableItem0);
          const tableItem1 = {
            totalCount: item.typeOneCount,
            typeName: "问题咨询",
          };
          this.tableData.push(tableItem1);
          const tableItem2 = {
            totalCount: item.typeTwoCount,
            typeName: "企业需求",
          };
          this.tableData.push(tableItem2);
          const tableItem3 = {
            totalCount: item.typeThreeCount,
            typeName: "投诉举报",
          };
          this.tableData.push(tableItem3);
          const tableItem4 = {
            totalCount: item.typeFourCount,
            typeName: "意见建议",
          };
          this.tableData.push(tableItem4);
          res.data.list.forEach((item) => {
            const tableItem = {
              totalCount: item.totalCount,
              typeName: item.typeName,
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