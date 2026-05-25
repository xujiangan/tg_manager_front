<template>
  <div>
    <el-timeline>
      <el-timeline-item v-for="(activity, index) in activities" :key="index">
        {{ activity.content }}
      </el-timeline-item>
    </el-timeline>

    <h4 style="margin-bottom: 10px">回复列表</h4>
    <el-card
      v-for="item in conmentList"
      :key="item.id"
      style="margin-bottom: 10px"
    >
      <h4 style="line-height: 30px">{{ item.replyContents }}</h4>

      <div>
        <div v-if="item.imageUrls.length > 0">
          <el-image
            class="upload_imgBox"
            v-for="(item, index) in item.imageUrls"
            :key="index"
            style="width: 130px; height: 130px"
            :src="item"
            :preview-src-list="item.imageUrls"
            @click="onPreview(item)"
          >
          </el-image>
        </div>
        <span style="color: #f56c6c" v-else>暂无图片~</span>
      </div>
      <div style="line-height: 30px">
        <a v-if="item.docUrls" :href="item.docUrls">点击下载附件</a>
        <span style="color: #f56c6c" v-else>暂无附件~</span>
      </div>
      <p style="margin-bottom: 10px">
        {{ item.departmentName }}
        <span style="margin-left: 5px; color: #999"> {{ item.time }}</span>
      </p>
      <el-button
        size="mini"
        @click="editComments(item)"
        v-if="item.departmentId === admin.departmentId"
        >编辑</el-button
      >
      <el-button
        size="mini"
        @click="deleteWarn(item)"
        v-if="item.departmentId === admin.departmentId"
        >删除</el-button
      >
    </el-card>
    <!-- <ul class="infinite-list" style="overflow: auto">
      <li v-for="item in conmentList" :key="item.id" class="infinite-list-item">
        {{ item.replyContents }} <el-button @click="editComments(item)">编辑</el-button>
        <el-button @click="deleteWarn(item)">删除</el-button>
      </li>
    </ul> -->
    <el-button @click="openComments">新增回复</el-button>

    <!-- 评论详情 -->
    <el-dialog
      title="回复详情"
      :visible.sync="dialogFormVisible"
      @closed="dialogFormVisible = false"
    >
      <div style="margin: 15px 0">
        <h4 style="margin-bottom: 10px">上传图片</h4>
        <el-upload
          action="#"
          :auto-upload="false"
          :on-change="uploadFile"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="9"
          :file-list="commentForm.imageUrls"
          multiple
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <div style="margin: 15px 0">
        <h4 style="margin-bottom: 10px">上传附件</h4>
        <el-upload
          action="#"
          accept=".zip,.rar"
          :auto-upload="false"
          :on-change="uploadFujian"
          :on-remove="handleRemoveFj"
          :file-list="commentForm.docUrls"
          :limit="1"
        >
          <el-button size="small"  type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过2M
          </div>
        </el-upload>
      </div>
      <textarea
        placeholder="输入回复内容"
        v-model="commentForm.replyContents"
        class="el_textarea"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveConments">确 认</el-button>
      </div>
    </el-dialog>
    <el-dialog  class="elDailogBox"  :visible.sync="dialogVisible">
      <img width="40%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { getStore, removeStore } from "../config/mUtils";
// import time from "time-formater";
import moment from "moment";
import {
  // 处理进度
  getComplaintRecordList,
  // 回复列表
  getAppealContentList,
  // 新增/编辑回复
  setAppealContent,
  // 删除回复
  deleteAppealContent,
} from "../api/getData";
export default {
  data() {
    return {
      dialogFormVisible: false,
      admin: {},
      form: {},
      newData: null,
      // 要删除/要编辑的评论
      commentForm: {
        id: null,
        value: "",
      },
      reverse: true,
      activities: [],
      conmentList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      imageUrls: [],
      docUrls: [],
    };
  },
  props: ["sendData"],
  watch: {
    data() {
      this.form = this.data;
    },
    deep: true,
  },
  created() {
    this.admin = JSON.parse(getStore("adminInfo"));
    console.log(this.admin);
    console.log(this.sendData);
    this.form = this.sendData;
    this.initData();

    // 要删除/要编辑的评论
    this.commentForm = {
      id: null,
      value: "",
    };
  },
  computed: {},
  methods: {
    uploadFile(e, fileList) {
      console.log(e);
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
          if (res.errCode == 0) {
            if (this.commentForm.id == null) {
              this.commentForm.docUrls=res.data.uploadUrl
            } else {
              this.commentForm.docUrls.push(res.data.uploadUrl);
            }
          }
        });
    },
    uploadFujian(e) {
      console.log(e)
      let fd = new FormData();
      fd.append("file", e.raw);
      this.$http
        .post("v1/file/multipartUpload", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.errCode == 0) {
            this.commentForm.docUrls = res.data.uploadUrl;
          }
        });
    },
    handleRemove(file, fileList) {
      console.log(file);
      this.imageUrls = fileList.map((e) => {
        return e.url;
      });
      console.log(this.imageUrls);
    },
    handleRemoveFj(file, fileList) {
      console.log(file);
      this.docUrls = fileList.map((e) => {
        return e.url;
      });
      console.log('aaaa',this.docUrls)
    },
    onPreview(e){
       this.dialogVisible = true;
      this.dialogImageUrl = e;
    },
    handlePictureCardPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    apiCode1() {
      console.log("接口1");
      this.getCommentList();
    },
    apiCode2() {
      console.log("接口2");
      this.getComplaintRecordLists();
    },
    // 获取数据
    initData() {
      this.apiCode1();
      this.apiCode2();
      // this.getCommentList();
    },
    // 获取反馈进度
    async getComplaintRecordLists() {
      try {
        const res = await getComplaintRecordList({
          appealId: this.form.id,
        });

        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.activities = [];
          res.data.complaintRecordList.forEach((item) => {
            const tableItem = {
              content: item.contents,
              // time: item.creatTime
              // replyContents: item.replyContents,
              // time: this.getFormatTime(item.timestamp), // 提交时间
            };
            this.activities.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    // 获取回复
    async getCommentList() {
      try {
        const res = await getAppealContentList({
          appealId: this.form.id,
        });

        if (res.errCode == 0) {
          this.count = res.data.totalCount;
          this.conmentList = [];
          res.data.list.forEach((item) => {
            const tableItem = {
              id: item.id, // id
              replyContents: item.replyContents,
              departmentName: item.departmentName,
              docUrls: item.docUrls,
              imageUrls: item.imageUrls ? item.imageUrls.split(",") : "",
              departmentId: item.replyDepartmentId,
              // time: item.creatTime
              // replyContents: item.replyContents,
              time: this.getFormatTime(item.createTime), // 提交时间
            };
            this.conmentList.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },

    // 打开评论
    openComments() {
      this.commentForm = {
        id: null,
        value: "",
      };
      this.dialogFormVisible = true;
    },
    editComments(item) {
      let list = [],
        docList = [];
      if (item.imageUrls.length > 0) {
        list = item.imageUrls.map((e) => ({
          name: e + "图片1",
          url: e,
        }));
      }
      if (item.docUrls) {
        docList = item.docUrls.split(",").map((e) => ({
          name: e + "图片1",
          url: e,
        }));
      }
      console.log(item);
      this.commentForm = {
        id: item.id, // id
        replyContents: item.replyContents,
        departmentName: item.departmentName,
        departmentId: item.departmentId,
        distributionId: this.sendData.distributionId
          ? this.sendData.distributionId
          : 0,
        docUrls: docList,
        imageUrls: list,
      };
      this.dialogFormVisible = true;
    },

    // 保存评论
    saveConments() {
      if (!this.commentForm.replyContents) {
        this.$message("请填写回复内容");
        return;
      }
      this.saveConment();
    },

    async saveConment() {
      let res = await setAppealContent({
        appealId: this.form.id,
        contentId: this.commentForm.id ? this.commentForm.id : 0,
        departmentId: this.admin.departmentId,
        content: this.commentForm.replyContents,
        distributionId: this.sendData.distributionId
          ? this.sendData.distributionId
          : 0,
        imageUrls: this.imageUrls.length > 0 ? this.imageUrls.join(",") : "",
        docUrls: this.docUrls.length > 0 ? this.docUrls.join(",") : "",
      });
      if (res.errCode == 0) {
        this.$message("操作成功");
        this.initData();
        this.dialogFormVisible = false;
      } else {
        this.$message(res.msg);
      }
    },

    // 删除
    deleteWarn(item) {
      this.commentForm = {
        id: item.id,
        value: item.value,
      };
      this.$confirm("即将删除此次回复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteAppealContents();
        })
        .catch(() => {
          // 点击取消进行的操作
        });
    },

    async deleteAppealContents() {
      let res = await deleteAppealContent({
        contentId: this.commentForm.id,
      });
      if (res.errCode == 0) {
        this.$message("删除成功");
        this.initData();
        this.dialogFormVisible = false;
      } else {
        this.$message(res.msg);
      }
    },

    // 获取格式化时间
    getFormatTime(times) {
      // let date = time(times);
      return moment(times).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>
<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 35px;
}
.el-dropdown-menu__item {
  text-align: center;
}

.el_textarea {
  border: 0;
  border-radius: 5px;
  background-color: rgba(241, 241, 241, 0.98);
  width: 100%;
  height: 100%;
  padding: 10px;
  resize: none;
}
.elDailogBox .el-dialog__body{
  text-align: center;
}
</style>
