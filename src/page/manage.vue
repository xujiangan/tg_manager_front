<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col
        :span="4"
        style="min-height: 100%; background-color: #324057"
        v-if="!admin.roleId || admin.roleId == 0 || admin.roleId == 1"
      >
      <!-- 
          :default-active="defaultActive" -->
        <el-menu
        background-color="#545c64"
      text-color="#fff"
      active-text-color="#1989fa"
          style="min-height: 100%"
          router
        >
          <el-menu-item index="manage"
            ><i class="el-icon-s-home"></i>首页</el-menu-item
          >
          <el-menu-item index="departmentList"
            ><i class="el-icon-s-check"></i>部门管理</el-menu-item
          >
            <el-menu-item index="userInfo"
            ><i class="el-icon-s-custom"></i>账户管理</el-menu-item
          >
          <el-menu-item index="userList"
            ><i class="el-icon-s-custom"></i>用户管理</el-menu-item
          >
          <el-menu-item index="companymanagementList">
            <i class="el-icon-s-finance"></i>企业管理</el-menu-item
          >
          <el-menu-item index="todoList">
            <i class="el-icon-s-order"></i>诉求管理</el-menu-item
          >
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-s-data"></i>数据统计</template>
            <el-menu-item-group>
              <el-menu-item index="data1">诉求数量统计</el-menu-item>
              <el-menu-item index="data2">单位完成统计</el-menu-item>
              <el-menu-item index="data3">诉求交办统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="data1">
            <i class="el-icon-menu"></i>诉求数量统计</el-menu-item
          >
          <el-menu-item index="data2">
            <i class="el-icon-menu"></i>单位完成统计</el-menu-item
          > -->
        </el-menu>
      </el-col>
      <el-col
        :span="4"
        style="min-height: 100%; background-color: #324057"
        v-if="admin.roleId == 2"
      >
        <el-menu
          :default-active="defaultActive"
          style="min-height: 100%"
          theme="light"
          router
        >
          <el-menu-item index="manage"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
           <el-menu-item index="userInfo"
            ><i class="el-icon-s-custom"></i>账户管理</el-menu-item
          >
          <el-menu-item index="todoList">
            <i class="el-icon-menu"></i>诉求管理</el-menu-item
          >
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->
         <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStore } from "./../config/mUtils";
export default {
  data() {
    return { admin: {}};
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace("/", "");
    },
  },
  methods: {
    getAdmin() {
      this.admin = JSON.parse(getStore("adminInfo"));
      return this.admin.roleId;
    },
  },
  mounted() {
    this.getAdmin();
  },
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
// .manage_page  .el-menu{
//   background: none;
// }


// .el-menu-item::hover{
//   color: #409EFF;
// }
// .is-active{
//   background: #1989fa;
//   color: #fff !important;
// }
</style>
