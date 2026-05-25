<template>
  <div class="fillcontain">
    <head-top></head-top>
    <!-- 搜索区域 -->
    <el-form class="demo-form-inline" style="padding: 0 20px">
      <el-row :gutter="20" style="margin-top: 30px">
        <el-col :span="4">
          <el-form-item label-width="0px">
            <!-- /联系人/联系电话 -->
            <el-input
              placeholder="企业名称、联系人、联系电话"
              v-model="keyword"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="appealTypeName"
            @change="typeChange"
            clearable
            placeholder="选择诉求类型"
          >
            <el-option
              v-for="item in typeList"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="satisfactionName"
            @change="satisfactionChange"
            clearable
            placeholder="选择满意度"
          >
            <el-option
              v-for="item in manyiList"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="appealLevelName"
            @change="levelChange"
            clearable
            placeholder="选择诉求级别"
          >
            <el-option
              v-for="item in levelList"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="secrecyName"
            @change="secrecyChange"
            clearable
            placeholder="选择是否保密"
          >
            <el-option
              v-for="item in secrecyList"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-date-picker
            v-model="stimes"
            type="datetime"
            placeholder="开始日期"
            @change="startChange"
          >
          </el-date-picker>
          <el-date-picker
            style="margin-left: 20px"
            v-model="etimes"
            type="datetime"
            placeholder="结束日期"
            @change="endChange"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button @click="initData">查询</el-button>
          <!-- <el-button @click="exportExcel">导出数据</el-button> -->
        </el-col>
      </el-row>
    </el-form>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" id="out-table">
        <el-table-column prop="id" label="诉求编号"> </el-table-column>
        <el-table-column label="企业名称">
          <template slot-scope="scope">
            <span
              class="col-cont"
              v-html="showHtml(scope.row.enterpriseName)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="enterpriseUserName" label="联系人">
        </el-table-column>
        <el-table-column prop="enterprisePhone" label="联系电话">
        </el-table-column>
        <el-table-column prop="typeName" label="诉求类型"> </el-table-column>
        <el-table-column prop="levelName" label="诉求级别"> </el-table-column>
        <!-- <el-table-column prop="comments" label="内容"> </el-table-column> -->
        <el-table-column prop="secrecyName" label="是否保密"> </el-table-column>
        <el-table-column
          prop="status"
          label="完成情况"
          v-if="admin.roleId == 2"
        >
        </el-table-column>
        <el-table-column
          prop="lastDoneTime"
          label="最晚完成时间"
          v-if="admin.roleId == 2"
        >
        </el-table-column>

        <el-table-column prop="createDate" label="提交时间"> </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="openInfoDialog(scope.$index, 'onView')"
              >详情</el-button
            >
            <el-button
              size="small"
              @click="openInfoDialog(scope.$index, 'onEdit')"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              v-if="admin.roleId == 2"
              @click="openDistributtonBack(scope.$index)"
              >退回
            </el-button>

            <el-button
              size="small"
              type="danger"
              v-if="admin.roleId != 2"
              @click="openLevelSetting(scope.$index)"
              >级别调整
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

    <div class="table_container" hidden>
      <el-table :data="tableData2" style="width: 100%" id="out-table">
        <el-table-column prop="id" label="诉求编号"> </el-table-column>
        <el-table-column label="企业名称">
          <template slot-scope="scope">
            <span
              class="col-cont"
              v-html="showHtml(scope.row.enterpriseName)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="enterpriseUserName" label="联系人">
        </el-table-column>
        <el-table-column prop="enterprisePhone" label="联系电话">
        </el-table-column>
        <el-table-column prop="typeName" label="诉求类型"> </el-table-column>
        <el-table-column prop="levelName" label="诉求级别"> </el-table-column>
        <!-- <el-table-column prop="comments" label="内容"> </el-table-column> -->
        <el-table-column prop="secrecyName" label="是否保密"> </el-table-column>
        <el-table-column prop="createDate" label="提交时间"> </el-table-column>
      </el-table>
    </div>
    <!-- 诉求详情 -->
    <el-dialog
      :title="this.tzType == 'onView' ? '诉求详情' : '编辑诉求内容'"
      :visible.sync="dialogFormVisible"
      @closed="handleClose"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item
          label="当前处理状态"
          v-if="admin.roleId == 2 && this.tzType == 'onView'"
        >
          <template>
            <span
              class="col-cont"
              v-html="showFPStatus(form.doneStatus)"
            ></span>
          </template>
        </el-form-item>
        <el-form-item label="企业名称" v-if="this.tzType == 'onView'">
          <el-input v-model="form.enterpriseName" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系人" v-if="this.tzType == 'onView'">
          <el-input v-model="form.enterpriseUserName" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系电话" v-if="this.tzType == 'onView'">
          <el-input v-model="form.enterprisePhone" readonly></el-input>
        </el-form-item>
        <el-form-item label="诉求类型" v-if="this.tzType == 'onView'">
          <el-input v-model="form.typeName" readonly></el-input>
        </el-form-item>
        <el-form-item label="诉求级别" v-if="this.tzType == 'onView'">
          <el-input v-model="form.levelName" readonly></el-input>
        </el-form-item>
        <el-form-item label="满意度" v-if="this.tzType == 'onView'">
          <el-input v-model="form.manyiName" readonly></el-input>
        </el-form-item>
        <el-form-item label="是否保密" v-if="this.tzType == 'onView'">
          <el-input v-model="form.secrecyName" readonly></el-input>
        </el-form-item>
        <el-form-item label="图片" v-if="this.tzType == 'onView'">
          <!-- <el-upload
            action="#" multiple :auto-upload="false" :on-change="uploadFile" 
        list-type="picture-card"
            :limit="9"
            :on-preview="onPreview"
            :on-remove="deleleImg"
          >
            <i class="el-icon-plus"></i>
          </el-upload> -->
          <div v-if="form.imageUrlList.length>0">
            <el-image class="upload_imgBox" v-for="(item,index) in form.imageUrlList" :key="index"
              style="width: 130px; height: 130px"
              :src="item" 
              :preview-src-list="form.imageUrlList">
            </el-image>
          </div>
          <span style="color:#F56C6C" v-else>暂无图片~</span>
        </el-form-item>
        <el-form-item label="附件" v-if="this.tzType == 'onView'">
          <a v-if="form.docUrls" :href="form.docUrls">点击下载附件</a>
          <span style="color:#F56C6C" v-else>暂无附件~</span>
        </el-form-item>

        <el-form-item label="内容">
          <el-input
            class="textarea-sy"
            type="textarea"
            v-if="this.tzType == 'onEdit'"
            v-model="form.comments"
          ></el-input>
          <p v-else>{{ form.comments }}</p>
        </el-form-item>
        <!-- v-model="getMoreContent(form.expand_comments)" -->
        <el-form-item label="补充内容" v-if="this.tzType == 'onView'">
          <el-input
            class="textarea-sy"
            readonly
            type="textarea"
            v-if="this.tzType == 'onEdit'"
            v-model="form.expand_comments"
          ></el-input>
          <p v-else>{{ form.expand_comments }}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-if="this.tzType == 'onEdit'"
          type="primary"
          @click="editSave(form.id)"
          >提交</el-button
        >
        <el-button v-if="this.tzType == 'onEdit'" @click="handleClose"
          >取消</el-button
        >
        <el-button
          type="primary"
          @click="openDistribution(form.id)"
          v-if="admin.roleId != 2 && this.tzType == 'onView'"
          >分配详情</el-button
        >
        <el-button
          v-if="this.tzType == 'onView'"
          type="primary"
          @click="openActionDetail(form.id)"
          >反馈进度</el-button
        >
      </div>
    </el-dialog>
    <!-- 级别调整 -->
    <el-dialog
      title="级别调整"
      :visible.sync="dialogFormVisible2"
      @closed="handleLevelSettingClose"
    >
      <el-select
        v-model="appealLevelName2"
        @change="levelChange2"
        clearable
        placeholder="选择诉求级别"
      >
        <el-option
          v-for="item in levelList2"
          :key="item.label"
          :label="item.value"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSaveLevelSetting"
          >确 认</el-button
        >
      </div>
    </el-dialog>

    <!-- 分配详情 -->
    <el-dialog
      title="分配详情"
      :visible.sync="dialogFormVisible3"
      @closed="dialogFormVisible3 = false"
    >
      <div class="table_container">
        <el-table :data="tableDataFP" style="width: 100%">
          <!-- prop="userName" -->
          <el-table-column prop="departmentName" label="部门名称">
          </el-table-column>
          <el-table-column prop="distributionTime" label="分配时间">
          </el-table-column>
          <el-table-column label="完成情况">
            <template slot-scope="scope">
              <span
                class="col-cont"
                v-html="showFPStatus(scope.row.doneStatus)"
              ></span>
            </template>
          </el-table-column>

          <el-table-column prop="lastDoneTime" label="最晚完成时间">
          </el-table-column>
          <el-table-column label="操作" style="width: 10%">
            <template slot-scope="scope">
              <el-button size="small" @click="cancelDistribution(scope.$index)"
                >撤销</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="openDistributionBackList(form.id)"
          >退回记录</el-button
        >
        <el-button type="primary" @click="openDisDepartmentList(form.id)"
          >去分配</el-button
        >
      </div>
    </el-dialog>

    <!-- 分配部门 -->
    <el-dialog
      title="选择分配部门"
      :visible.sync="dialogFormVisible6"
      @closed="dialogFormVisible6 = false"
    >
      <el-select
        v-model="valueDepartment"
        filterable
        multiple
        placeholder="请选择"
      >
        <el-option
          v-for="item in tableDataDepart"
          :key="item.departmentId"
          :label="item.departmentName"
          :value="item.departmentId"
        >
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDistributions()">确定</el-button>
        <el-button type="primary" @click="dialogFormVisible6 = false"
          >取消</el-button
        >
      </div>
    </el-dialog>

    <!-- 退回记录 -->
    <el-dialog
      title="退回记录"
      :visible.sync="dialogFormVisible4"
      @closed="dialogFormVisible4 = false"
    >
      <div class="table_container">
        <el-table :data="tableDataBack" style="width: 100%">
          <!-- prop="userName" -->
          <el-table-column prop="departmentName" label="部门名称">
          </el-table-column>
          <el-table-column prop="distributionTime" label="分配时间">
          </el-table-column>
          <el-table-column prop="backTime" label="退回时间"> </el-table-column>
          <el-table-column prop="backReason" label="退回原因">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 退回分配 -->
    <el-dialog
      title="退回分配"
      :visible.sync="dialogFormVisible5"
      @closed="dialogFormVisible5 = false"
    >
      <el-input placeholder="输入退回原因" v-model="backReason"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="backDistribution">确 认</el-button>
      </div>
    </el-dialog>

    <!-- 反馈进度 -->
    <el-dialog
      title="反馈进度"
      :visible.sync="dialogFormVisible7"
      @closed="closeFormVisible"
      @close="closeFormVisible"
    >
      <action-detail
        v-if="sendData"
        ref="dialogbox"
        :sendData="sendData"
      ></action-detail>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import actionDetail from "../components/actionDetail";
import moment from "moment";

import { getStore } from "./../config/mUtils";
import {
  getQuestionList,
  // 分配列表
  getDistributionList,
  // 新增分配
  addDistribution,
  // 退回分配
  backDistribution,
  // 退回记录
  getDistributionBackList,
  // 可分配部门列表
  getDistributionDepartmentList,
  // 撤销分配
  deleteDistribution,
  // 级别调整
  setAppealLevel,
  updateAppealContent, //编辑诉求
} from "@/api/getData";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import ActionDetail from "../components/actionDetail.vue";
export default {
  data() {
    return {
      // 诉求列表
      tableData: [],
      // 诉求全部数据
      tableData2: [],
      currentRow: null,
      limit: 10,
      count: 0,
      currentPage: 1,
      times: "",
      // 操作详情id
      currId: 0,
      // 详情弹窗
      dialogFormVisible: false,
      // 级别弹窗
      dialogFormVisible2: false,
      appealLevel2: 0,
      appealLevelName2: "",
      appealLevelItem: null,
      appealLevelIndex2: -1,

      // 分配列表弹窗
      dialogFormVisible3: false,
      // 分配列表数据
      tableDataFP: [],

      // 分配退回记录列表弹窗
      dialogFormVisible4: false,
      // 退回记录列表数据
      tableDataBack: [],

      // 退回弹窗
      dialogFormVisible5: false,
      backReason: "",

      // 分配部门
      dialogFormVisible6: false,
      tableDataDepart: [],
      valueDepartment: [],

      // 反馈进度
      dialogFormVisible7: false,
      sendData: null, //进度内容
      typeList: [
        { value: "查看全部", label: -1 },
        { value: "问题咨询", label: 1 },
        { value: "企业需求", label: 2 },
        { value: "投诉举报", label: 3 },
        { value: "意见建议", label: 4 },
      ],
      manyiList: [
        { value: "查看全部", label: -1 },
        { value: "未提交", label: 0 },
        { value: "满意", label: 1 },
        { value: "一般", label: 2 },
        { value: "不满意", label: 3 },
      ],
      levelList: [
        { value: "查看全部", label: -1 },
        { value: "未设置", label: 0 },
        { value: "简单", label: 1 },
        { value: "一般", label: 2 },
        { value: "复杂", label: 3 },
      ],
      levelList2: [
        { value: "简单", label: 1 },
        { value: "一般", label: 2 },
        { value: "复杂", label: 3 },
      ],
      // 0 保密 1不保密
      secrecyList: [
        { value: "查看全部", label: -1 },
        { value: "否", label: 0 },
        { value: "是", label: 1 },
      ],

      form: {
        id: null, // id
        type: 1, // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
        typeName: "", // 诉求类型名称
        enterpriseId: null, // 企业id
        enterpriseName: "", // 企业名称
        enterpriseUserName: "", // 企业法人
        enterprisePhone: "", // 企业联系电话
        secrecy: -1, // 是否保密
        secrecyName: "",
        comments: "", // 诉求内容
        expand_comments: "", // 诉求补充内容
        satisfaction: 0, // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
        manyiName: "",
        level: 0, // 诉求级别：0未设置、1简单、2一般、3复杂
        levelName: "",
        createDate: "", // 提交时间
        updateDate: "",
        deleted: 0, // 是否删除
        expand1: "",
        expand2: "",
        expand3: "",
      },
      // 当前登录用户
      admin: {},

      // 搜索条件
      userId: 0, //用户id
      keyword: "", //关键字
      startTime: "",
      stimes: "",
      endTime: "",
      etimes: "",
      appealType: -1, //诉求类型
      appealTypeName: "",
      secrecy: -1, //是否保密
      secrecyName: "",
      satisfaction: -1, //满意度
      satisfactionName: "",
      appealLevel: -1, //级别
      appealLevelName: "",
      tzType: "", //按钮类型
      dialogImageUrl:'',//图片预览地址
      dialogVisible:false
    };
  },
  components: {
    headTop,
    actionDetail,
  },
  created() {
    this.admin = JSON.parse(getStore("adminInfo"));
    this.userId = this.admin.id;
    this.initData();
  },
  methods: {
    uploadFile(e, fileList) {
      console.log(e,fileList)
      let fd = new FormData();
      fileList.map((item) => {
        fd.append("file", item.raw);
      });
      this.$http
        .post("v1/file/multipartUpload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
         if(res.errCode==0){
          this.imageUrlList=res.data.uploadUrl;
         }
          
        });
    },
    deleleImg(file, fileList) {
      console.log(file, fileList);
    },
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    editSave(id) {
      updateAppealContent({
        appealId: id,
        appealComments: this.form.comments,
      }).then((res) => {
        if (res.errCode == 0) {
          this.$message({ message: "操作成功", type: "success" });
          this.handleClose();
          this.initData();
        } else {
          this.$message({
            message: res.msg,
            type: "error",
          });
        }
      });
    },
    startChange(e) {
      this.startTime = e;
    },
    endChange(e) {
      this.endTime = e;
    },
    // 诉求类型选择
    typeChange(e) {
      this.appealType = e;
      // console.log(e);
    },
    // 诉求级别选择
    levelChange(e) {
      this.appealLevel = e;
      // console.log(e);
    },
    // 设置诉求级别时候的选择
    levelChange2(e) {
      this.appealLevel2 = e;
      this.appealLevelName2 = this.getLevelName(e);
      console.log(this.appealLevelName2);
    },
    // 是否保密选择
    secrecyChange(e) {
      this.secrety = e;
    },
    //满意度选择
    satisfactionChange(e) {
      this.satisfaction = e;
    },
    // 获取诉求处理进度 文本
    getDoneStatus(type) {
      //  0待处理 1已处理
      if (type == 0) return "待处理";
      if (type == 1) return "已处理";
      else return "其他";
    },
    // 获取诉求类型 文本
    getTypeName(type) {
      //  1问题咨询 2企业需求 3投诉举报 4意见建议
      if (type == 1) return "问题咨询";
      if (type == 2) return "企业需求";
      if (type == 3) return "投诉举报";
      if (type == 4) return "意见建议";
    },
    // 获取满意度 文本
    getManyiTypeName(type) {
      // 0未提交、1 满意、2 一般、 3 不满意
      if (type == 0) return "未提交";
      if (type == 1) return "满意";
      if (type == 2) return "一般";
      if (type == 3) return "不满意";
    },
    // 获取诉求级别 文本
    getLevelName(type) {
      // 0未设置(默认）、1简单、2一般、3复杂
      if (!type || type == 0) return "未设置";
      if (type == 1) return "简单";
      if (type == 2) return "一般";
      if (type == 3) return "复杂";
    },
    // 获取补充诉求
    getMoreContent(contents) {
      // var list =
      var contentList = contents.replace("null#**#", "").split("#**#");
      return contentList.join("\n");
    },

    // 获取补充诉求
    getPicList(contents) {
      // var list =
      var contentList = contents?contents.split(","):[];
      return contentList;
    },

    // 获取格式化时间
    getFormatTime(times) {
      // let date = time(times);
      // return date.format("YYYY-MM-DD HH:mm:ss");
      return moment(times).format("YYYY-MM-DD HH:mm:ss");
    },
    initData() {
      try {
        this.currentPage = 1;
        this.getAdmin();
        // this.getAll();
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
        const loading = this.$loading({
          lock: true,
          text: "正在加载数据...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        const res = await getQuestionList({
          page: this.currentPage,
          count: this.limit,
          departmentId: this.admin.departmentId,
          userId: this.userId, //用户id
          keyword: this.keyword, //关键字
          startTime: this.startTime, //开始时间
          endTime: this.endTime, //结束时间
          appealType: this.appealType, //诉求类型
          secrecy: this.secrecy == -1 ? null : this.secrety, //是否保密
          satisfaction: this.satisfaction, //满意度
          appealLevel: this.appealLevel, //级别
        });
        loading.close();
        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.tableData = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.id, // id
              type: item.appealType, // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
              typeName: this.getTypeName(item.appealType), // 诉求类型名称
              enterpriseId: item.enterpriseId, // 企业id
              enterpriseName: item.enterpriseName, // 企业名称
              enterpriseUserName: item.enterpriseUserName, // 企业法人
              enterprisePhone: item.enterprisePhone, // 企业联系电话
              secrecy: false, // 是否保密
              secrecyName: item.secrecy ? "是" : "否",
              comments: item.appealComments, // 诉求内容
              expand_comments: item.appealExpandComments, // 诉求补充内容
              satisfaction: item.satisfaction, // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
              manyiName: this.getManyiTypeName(item.satisfaction), // 诉求类型名称
              level: item.level, // 诉求级别：0未设置、1简单、2一般、3复杂
              levelName: this.getLevelName(item.appealLevel),
              createDate: this.getFormatTime(item.createDate), // 提交时间
              lastDoneTime: this.getFormatTime(item.lastDoneTime), // 最晚完成时间
              distributionId: item.distributionId,
              docUrls: item.docUrls,
              imageUrls: item.imageUrls,
              status: this.getDoneStatus(item.status),
            };
            this.tableData.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getAll() {
      try {
        const res = await getQuestionList({
          fromType: -1,
          page: this.currentPage,
          count: this.limit,
          secrety: this.secrecyVal,
          complaintType: this.typeVal,
          startTime: this.startTime,
          endTime: this.endTime,
          keyword: this.keywords,
        });
        if (res.errCode == 0) {
          //this.count = res.data.totalCount;
          this.tableData2 = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.id, // id
              type: item.type, // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
              typeName: this.getTypeName(item.type), // 诉求类型名称
              enterpriseId: item.enterpriseId, // 企业id
              enterpriseName: item.enterpriseName, // 企业名称
              enterpriseUserName: item.enterpriseUserName, // 企业法人
              enterprisePhone: item.enterprisePhone, // 企业联系电话
              secrecy: false, // 是否保密
              comments: item.comments, // 诉求内容
              expand_comments: item.expand_comments, // 诉求补充内容
              satisfaction: item.satisfaction, // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
              manyiName: this.getManyiTypeName(item.satisfaction), // 诉求类型名称
              level: item.level, // 诉求级别：0未设置、1简单、2一般、3复杂
              levelName: this.getLevelName(item.level),
              docUrls: item.docUrls,
              imageUrls: item.imageUrls,
              createDate: this.getFormatTime(item.createDate), // 提交时间
            };
            this.tableData2.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    // 导出数据
    //定义导出Excel表格事件
    exportExcel() {
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(document.querySelector("#out-table2"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "诉求列表" + time().format("YYYYMMDDHHmmss") + ".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
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
    // 级别设置
    openLevelSetting(index) {
      if (index > -1) {
        var item = this.tableData[index];
        this.appealLevelItem = item;
        this.appealLevelIndex2 = index;
        this.appealLevel2 = item.level;
        this.appealLevelName2 = item.levelName;
        this.form = {
          id: item.id, // id
        };
        this.dialogFormVisible2 = true;
      }
    },
    // 关闭级别选择弹窗
    handleLevelSettingClose() {
      this.dialogFormVisible2 = false;
      this.form = {
        id: null, // id
        type: 1, // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
        typeName: "", // 诉求类型名称
        enterpriseId: null, // 企业id
        enterpriseName: "", // 企业名称
        enterpriseUserName: "", // 企业法人
        enterprisePhone: "", // 企业联系电话
        secrecy: false, // 是否保密
        secrecyName: "",
        comments: "", // 诉求内容
        expand_comments: "", // 诉求补充内容
        satisfaction: 0, // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
        manyiName: "",
        level: 0, // 诉求级别：0未设置、1简单、2一般、3复杂
        levelName: "",
        createDate: "", // 提交时间
        updateDate: "",
        deleted: 0, // 是否删除
        expand1: "",
        expand2: "",
        expand3: "",
      };
      this.appealLevel2 = -1;
      this.appealLevelName2 = "";
      this.appealLevelItem = null;
      this.appealLevelIndex2 = -1;
    },
    // 保存级别设置
    handleSaveLevelSetting() {
      // if(this.form.id){ // 编辑}else{// 新增}
      if (!this.appealLevel2) {
        this.$message("请选择级别");
        return;
      }
      this.saveLevelStting();
    },
    async saveLevelStting() {
      let res = await setAppealLevel({
        appealLevel: this.appealLevel2,
        appealId: this.form.id,
      });
      if (res.errCode == 0) {
        this.$message("操作成功");
        //this.initData();
        this.getAdmin();
        // this.appealLevelItem.appealLevel = this.appealLevel2;
        // this.appealLevelItem.appealLevelName = this.appealLevelName2;
        // this.$set(this.tableData, this.appealLevelIndex2, this.appealLevelItem);
        this.handleLevelSettingClose();
      } else {
        this.$message(res.msg);
      }
    },

    // 查看诉求详情
    openInfoDialog(index, str) {
      this.tzType = str;
      if (index > -1) {
        var item = this.tableData[index];
        console.log(item);
        this.form = {
          id: item.id, // id
          type: item.type, // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
          typeName: this.getTypeName(item.type), // 诉求类型名称
          enterpriseId: item.enterpriseId, // 企业id
          enterpriseName: item.enterpriseName, // 企业名称
          enterpriseUserName: item.enterpriseUserName, // 企业法人
          enterprisePhone: item.enterprisePhone, // 企业联系电话
          secrecy: item.secrecy, // 是否保密
          secrecyName: item.secrecyName, // 是否保密
          comments: item.comments, // 诉求内容
          expand_comments: this.getMoreContent(
            item.expand_comments ? item.expand_comments : ""
          ), // 诉求补充内容
          satisfaction: item.satisfaction, // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
          manyiName: item.manyiName, // 诉求类型名称
          level: item.level, // 诉求级别：0未设置、1简单、2一般、3复杂
          levelName: item.levelName,
          createDate: item.createDate, // 提交时间
          distributionId: item.distributionId,
          docUrls: item.docUrls,
          imageUrlList: this.getPicList(item.imageUrls),
        };
        this.dialogFormVisible = true;
        if (this.admin.roleId == 2) {
          this.getDistributionStatus(this.form.id, this.form.distributionId);
        }
      }
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.form = {
        id: null, // id
        type: 1, // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
        typeName: "", // 诉求类型名称
        enterpriseId: null, // 企业id
        enterpriseName: "", // 企业名称
        enterpriseUserName: "", // 企业法人
        enterprisePhone: "", // 企业联系电话
        secrecy: false, // 是否保密
        secrecyName: "",
        comments: "", // 诉求内容
        expand_comments: "", // 诉求补充内容
        satisfaction: 0, // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
        manyiName: "",
        level: 0, // 诉求级别：0未设置、1简单、2一般、3复杂
        levelName: "",
        createDate: "", // 提交时间
        updateDate: "",
        deleted: 0, // 是否删除
        expand1: "",
        expand2: "",
        expand3: "",
      };
    },

    // 查看分配列表
    openDistribution(id) {
      this.currId = id;
      this.dialogFormVisible3 = true;
      this.getDistribution(id);
    },
    async getDistribution(appealIds) {
      try {
        const res = await getDistributionList({
          appealId: appealIds, // 诉求id
        });

        if (res.errCode == 0) {
          //this.count = res.data.totalCount;
          this.tableDataFP = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.distributionId,
              departmentId: item.departmentId,
              departmentName: item.departmentName, // 部门名称
              distributionTime: this.getFormatTime(item.distributionTime), // 分配时间
              lastDoneTime: this.getFormatTime(item.lastDoneTime), // 最晚完成时间
              statusName: this.showFPStatus(item.doneStatus), // 完成状态
              doneStatus: item.doneStatus, // 完成状态
            };
            this.tableDataFP.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    // 部门查看分配状态
    async getDistributionStatus(appealIds, distributionIds) {
      try {
        const res = await getDistributionList({
          appealId: appealIds, // 诉求id
          distributionId: distributionIds,
        });
        this.form.doneStatusName = "未知";
        if (res.errCode == 0) {
          //this.count = res.data.totalCount;
          this.tableDataFP = [];
          res.data.list.forEach((item) => {
            this.form.doneStatus = item.doneStatus; // 完成状态
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    // 根据分配状态显示不同的文字
    showFPStatus(val) {
      val = val + "";
      var statusName = "";
      var color = "#000000";
      //       1. 没有超过最晚完成时间，并且待处理：待处理；
      // 2. 待处理且距离最晚完成时间X内：即将到期；
      // 3. 已完成并且没有超过最晚完成时间：已完成:
      // 4. 已完成但是超过了最晚完成时间：超时完成；
      // 5. 未完成并且超过了最晚完成时间：已过期；
      if (val == 1 || val == 0) {
        statusName = "待处理";
        color = "#000000";
      } else if (val == 2) {
        statusName = "即将到期";
        color = "#FFD700";
      } else if (val == 3) {
        statusName = "已完成";
        color = "#008000";
      } else if (val == 4) {
        statusName = "超时完成";
        color = "#FFA07A";
      } else if (val == 5) {
        statusName = "已过期";
        color = "#FF0000";
      }
      return '<font color="' + color + '">' + statusName + "</font>";
    },

    // 新增分配
    addDistributions() {
      this.addDistributioning();
    },
    async addDistributioning() {
      const loading = this.$loading({
        lock: true,
        text: "正在分配...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let res = await addDistribution({
        appealId: this.currId,
        departmentIds: this.valueDepartment.join(","),
      });
      loading.close();
      if (res.errCode == 0) {
        this.$message("操作成功");
        this.getDistribution(this.currId);
      } else {
        this.$message(res.msg);
      }
    },

    // 撤销
    cancelDistribution(index) {
      var item = this.tableDataFP[index];
      this.$confirm(
        "即将撤销对部门【" + item.departmentName + "】的分配, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          // 点击确定进行的操作
          this.cancelDistributions(item.id);
        })
        .catch(() => {
          // 点击取消进行的操作
        });
    },
    async cancelDistributions(id) {
      let res = await deleteDistribution({
        distributionId: id,
      });
      if (res.errCode == 0) {
        this.$message("操作成功");
        this.getDistribution(this.currId);
      } else {
        this.$message(res.msg);
      }
    },

    // 查看分配退回记录列表
    openDistributionBackList(id) {
      this.currId = id;
      this.dialogFormVisible4 = true;
      this.getDistributionBackList(id);
    },
    async getDistributionBackList(appealIds) {
      try {
        const res = await getDistributionBackList({
          appealId: appealIds, // 诉求id
          distributionStatus: 3, // 已退回传3
        });

        if (res.errCode == 0) {
          //this.count = res.data.totalCount;
          this.tableDataBack = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.id,
              departmentId: item.departmentId,
              departmentName: item.departmentName, // 部门名称
              distributionTime: this.getFormatTime(item.distributionTime), // 分配时间
              backTime: this.getFormatTime(item.backTime), // 最晚完成时间
              backReason: item.backReason, // 退回原因
            };
            this.tableDataBack.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    // 查看可分配的部门列表
    openDisDepartmentList(id) {
      this.currId = id;
      this.dialogFormVisible6 = true;
      this.tableDataDepart = [];
      this.valueDepartment = [];
      this.getDistributionDepartmentList(id);
    },
    async getDistributionDepartmentList(appealIds) {
      try {
        const res = await getDistributionDepartmentList({
          appealId: appealIds, // 诉求id
          page: 1,
          count: 10000,
        });

        if (res.errCode == 0) {
          //this.count = res.data.totalCount;
          this.tableDataDepart = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              departmentId: item.departmentId,
              departmentName: item.departmentName,
            };
            this.tableDataDepart.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    // 打开退回弹窗
    openDistributtonBack(index) {
      var item = this.tableData[index];
      this.currId = item.distributionId;
      this.dialogFormVisible5 = true;
      this.backReason = "";
    },

    // 退回
    backDistribution() {
      this.$confirm("即将退回此次分配, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定进行的操作
          this.backDistributions(this.currId);
        })
        .catch(() => {
          // 点击取消进行的操作
        });
    },
    async backDistributions(id) {
      let res = await backDistribution({
        distributionId: id,
        backReason: this.backReason,
      });
      if (res.errCode == 0) {
        this.currId = 0;
        this.dialogFormVisible5 = false;
        this.backReason = "";
        this.$message("操作成功");
        this.initData();
      } else {
        this.$message(res.msg);
      }
    },

    // 打开反馈进度
    openActionDetail() {
      console.log(this.form.id);
      this.dialogFormVisible7 = true;
      this.sendData = this.form;
      // this.$refs.actionDetail.apiCode1();
      // this.$refs.actionDetail.apiCode1();
    },
    closeFormVisible() {
      this.sendData = null;
      this.dialogFormVisible7 = false;
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";

.table_container {
  padding: 20px;
}
.textarea-sy textarea {
  min-height: 200px !important;
}
.upload_imgBox {
  margin-right: 15px;
}
</style>