<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-form class="demo-form-inline" style="padding: 0 20px">
      <el-row :gutter="20" style="margin-top: 30px">
        <el-col :span="8">
          <el-form-item>
            <el-input
              placeholder="企业名称/联系人/联系电话"
              v-model="keywords"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="initData">查询</el-button>
        </el-col>
        <el-col :span="8">
          <el-button @click="dialogFormVisible = true">新增</el-button>
          <!-- <el-upload
            :file-list="uploadFiles"
            action="alert"
            :auto-upload="false"
            multiple
            :on-change="loadJsonFromFile"
          >
            <el-button type="primary">批量导入</el-button>
          </el-upload> -->
          <!-- <el-button>
            <a href="http://47.97.1.31/static/company.xlsx"
              >下载模板</a
            ></el-button
          > -->
        </el-col>
      </el-row>
    </el-form>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <!-- prop="userName" -->
        <el-table-column label="企业名称">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showHtml(scope.row.name)"></span>
          </template>
        </el-table-column>
        <el-table-column label="法人" style="width: 10%">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showHtml(scope.row.userName)"></span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" style="width: 10%">
          <template slot-scope="scope">
            <span class="col-cont" v-html="showHtml(scope.row.phone)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="codeNum" label="企业机构代码"> </el-table-column>
        <el-table-column label="操作" style="width: 10%">
          <template slot-scope="scope">
            <el-button size="small" @click="openDialog(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="Pagination"
        style="text-align: left; margin-top: 10px; float: right"
      >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="form.id ? '编辑' : '新增'"
      :visible.sync="dialogFormVisible"
      @closed="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="法人" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="机构代码" prop="codeNum">
          <el-input v-model="form.codeNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import {
  getEnterpriseList,
  addOrUpdateEnterprise,
  deleteEnterprise,
} from "@/api/getData";
import { getStore } from "./../config/mUtils";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      limit: 10,
      count: 0,
      currentPage: 1,
      keywords: "",
      dialogFormVisible: false,
      form: {
        id: null,
        name: "",
        userName: "",
        phone: "",
        codeNum: "",
        password: "",
      },
      classId: "",
      rules: {
        name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请输入法人名称", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  components: {
    headTop,
  },
  created() {
    this.initData();
    var admin = JSON.parse(getStore("adminInfo"));
    this.classId = admin.userRelId;
  },
  methods: {
    initData() {
      try {
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
      this.getAdmin();
    },
    async getAdmin() {
      try {
        const res = await getEnterpriseList({
          page: this.currentPage,
          count: this.limit,
          keyword: this.keywords,
        });
        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.tableData = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.id,
              name: item.ename,
              userName: item.userName,
              phone: item.contact,
              codeNum: item.codeNum,
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
    // 选中某一项进行编辑
    openDialog(index) {
      if (index == -1) {
        // 新增
        this.form = {
          id: null,
          name: "",
          userName: "",
          phone: "",
          codeNum: ""
        };
      } else {
        // 编辑
        var item = this.tableData[index];
        this.form = {
          id: item.id,
          name: item.name,
          userName: item.userName,
          phone: item.phone,
          codeNum: item.codeNum
        };
      }

      this.dialogFormVisible = true;
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
      this.form = {
        id: null,
        name: "",
        userName: "",
        phone: "",
        codeNum: ""
      };
    },
    handleSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // if(this.form.id){ // 编辑}else{// 新增}
          this.save();
        } else {
          this.$message("输入错误");
        }
      });
    },
    async save() {
      let res = await addOrUpdateEnterprise({
        enterpriseId: this.form.id,
        ename: this.form.name,
        userName: this.form.userName,
        codeNum: this.form.codeNum,
        phone: this.form.phone
      });
      if (res.errCode == 0) {
        this.$message("操作成功");
        this.initData();
        this.handleClose();
      } else {
        this.$message(res.msg);
      }
    },
    handleDelete(index) {
      var item = this.tableData[index];
      this.$confirm("即将删除企业" + item.name + " , 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定进行的操作
          this.delete(item);
        })
        .catch(() => {
          // 点击取消进行的操作
        });
    },

    async delete(item) {
      try {
        const res = await deleteEnterprise({
          enterpriseId: item.id,
        });
        console.log(res);
        if (res.errCode == 0) {
          this.$message("删除成功");
          this.initData();
        } else {
          this.$message(res.msg || "删除失败");
        }
      } catch (err) {
        this.$message(err || "删除失败");
      }
    },
    // 下载模板
    download() {},

    // 高亮文字
    showHtml(val) {
      val = val + "";
      if (val.indexOf(this.keywords) !== -1 && this.keywords !== "") {
        return val.replace(
          this.keywords,
          '<font color="#409EFF">' + this.keywords + "</font>"
        );
      } else {
        return val;
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