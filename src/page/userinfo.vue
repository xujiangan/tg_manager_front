<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-form class="demo-form-inline" style="padding: 0 20px">
    
    </el-form>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <!-- prop="userName" -->
        <el-table-column prop="name" label="用户名"> </el-table-column>
        <el-table-column prop="userPhone" label="手机号"> </el-table-column>
        <el-table-column prop="account" label="登录账户"> </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="departmentName" label="所属部门">
        </el-table-column>
        <el-table-column label="操作" style="width: 10%">
          <template slot-scope="scope">
            <el-button size="small" @click="openDialog(scope.$index)"
              >编辑</el-button
            >
            <!-- <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button> -->
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
      :title="form.id ? '编辑后台用户' : '新增后台用户'"
      :visible.sync="dialogFormVisible"
      @closed="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="选择部门" prop="departmentName2">
          <el-select
            v-model="form.departmentName"
            @change="typeChangeByEdit"
            clearable
            placeholder="选择部门"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.departmentName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="登录账户" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="form.id ? '编辑企业用户' : '新增企业用户'"
      :visible.sync="dialogFormVisible2"
      @closed="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="企业名称">
          <el-input v-model="form.enterpriseName" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="form.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
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
  getAdminUser,
  addUser,
  updateUser,
  getAllDepartment,
  deleteCompany,
} from "@/api/getData";
import { getStore,setStore } from "./../config/mUtils";
export default {
  data() {
    return {
      tableData: [],
      departmentList: [],
      currentRow: null,
      limit: 10,
      count: 0,
      currentPage: 1,
      keywords: "",
      userType: -1,
      userTypeName: "",
      userTypeList: [
        { value: "全部用户", label: -1 },
        { value: "后台用户", label: 1 },
        { value: "企业用户", label: 2 },
      ],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      admin:{},
      form: {
        id: null,
        name: "",
        account: "",
        password: "",
        departmentId: null,
        departmentName: "",
        enterpriseId: null,
        enterpriseName: "",
        userPhone: "",
        userType: -1,
      },
      classId: "",
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入登录账户", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  components: {
    headTop,
  },
  created() {
    this.admin = JSON.parse(getStore("adminInfo"));
    this.classId = this.admin.userRelId;
    this.keywords = this.admin.phone;
    this.initData();
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
    // 获取所有用户
    async getAdmin() {
      try {
        const res = await getAdminUser({
          page: this.currentPage,
          count: this.limit,
          keyword: this.keywords,
          userType: this.userType,
        });
        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.tableData = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.userId,
              name: item.userAccountName,
              account: item.userName,
              password: item.passwords,
              departmentId: item.departmentId,
              departmentName: item.departmentName,
              enterpriseId: item.enterpriseId,
              enterpriseName: item.enterpriseName,
              userPhone: item.userPhone,
              userType: item.userType,
              userTypeName: item.userType == 1 ? "后台用户" : "企业用户",
            };
            if(this.admin.id == item.userId){
              this.tableData.push(tableItem);
            }
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
        // 编辑
        var item = this.tableData[index];
        this.form = {
          id: item.id,
          name: item.name,
          account: item.account,
          password: item.password,
          departmentName: item.departmentName,
          departmentId: item.departmentId,
          enterpriseId: item.enterpriseId,
          enterpriseName: item.enterpriseName,
          userPhone: item.userPhone,
          userType: item.userType,
        };
        if (item.userType == 1) {
          // 后台用户
          this.dialogFormVisible = true;
        } 
      
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.dialogFormVisible = false;
      this.dialogFormVisible2 = false;
    },
    handleSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.id) {
            // 编辑
            this.update();
          } else {
            // 新增
            this.add();
          }
        } else {
          this.$message("输入错误");
        }
      });
    },
    async add() {
      let res = await addUser({
        userName: this.form.account,
        accountName: this.form.name,
        password: this.form.password,
        departmentId: this.form.departmentId,
        userType: 1,
        phone: this.form.userPhone
      });
      if (res.errCode == 0) {
        this.$message("操作成功");
       
        this.initData();
        this.handleClose();
      } else {
        this.$message(res.msg);
      }
    },
    async update() {
      var name =
        this.form.userType == 2 ? this.form.userPhone : this.form.account;
      let res = await updateUser({
        userId: this.form.id,
        phone: this.form.userPhone,
        ename: this.form.enterpriseName,
        // 登录账户 如果是企业  登录账户==手机号
        userName: name,
        accountName: this.form.name,
        password: this.form.password,
        departmentId: this.form.departmentId,
        enterpriseId: this.form.enterpriseId,
        userType: this.form.userType,
      });
      if (res.errCode == 0) {
        this.$message("操作成功");
         this.admin.userName = this.form.account;
        this.admin.accountName = this.form.name;
        this.admin.departmentId = this.form.departmentId;
        this.admin.phone = this.form.userPhone;
        setStore("adminInfo",this.admin);
        this.initData();
        this.handleClose();
      } else {
        this.$message(res.msg);
      }
    },
    handleDelete(index) {
      var item = this.tableData[index];
      this.$confirm("即将删除企业" + item.userName + " , 是否继续?", "提示", {
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
        const res = await deleteCompany({
          departmentId: item.id,
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

    // 选择用户类型
    typeChange(e) {
      this.userType = e;
      // console.log(e);
    },

    // 选择部门
    typeChangeByEdit(e) {
      this.form.departmentId = e;
      // console.log(e);
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