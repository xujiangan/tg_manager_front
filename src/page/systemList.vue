<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-form class="demo-form-inline" label-width="80px">
            <el-row :gutter="20" style="margin-top: 30px;">
                <el-col :span="6">
                    <el-form-item label="审批人">
                        <el-input  placeholder="企业名称/联系人/联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-select v-model="typeVal" @change="typeChange" clearable placeholder="投诉类型">
                        <el-option
                          v-for="item in typeList"
                          :key="item.label"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <el-select v-model="secrecyVal" @change="typeChange" clearable placeholder="是否保密">
                        <el-option
                          v-for="item in secrecyList"
                          :key="item.label"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    <el-date-picker
                    v-model="startTime"
                    type="date"
                    placeholder="开始日期">
                  </el-date-picker>
                  <el-date-picker
                    v-model="endTime"
                    type="date"
                    placeholder="结束日期">
                  </el-date-picker>
                    <el-button>查询</el-button>
                    <el-button>批量导出</el-button>
                </el-col>
            </el-row>
        </el-form>
        <div class="table_container">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="user_name" label="企业名称">
                </el-table-column>
                <el-table-column prop="user_name" label="联系人">
                </el-table-column>
                <el-table-column prop="user_name" label="联系电话">
                </el-table-column>
                <el-table-column prop="user_name" label="投诉类型">
                </el-table-column>
                <el-table-column prop="city" label="内容">
                </el-table-column>
                <el-table-column prop="city" label="是否保密">
                </el-table-column>
                <el-table-column prop="city" label="投诉时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;float: right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    // import { adminList, adminCount } from '@/api/getData'
    export default {
        data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                times:'',
                typeList:[
                    { value:'问题咨询',label:0  },
                    { value:'企业需求',label:1  },
                    { value:'投诉类型',label:2  },
                    { value:'意见建议',label:3  },
                ],
                secrecyList:[
                { value:'是',label:0  },
                    { value:'否',label:1  },
                ],
                secrecyVal:'',
                typeVal:'',
                startTime:'',
                endTime:''
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            typeChange(e){
                console.log(e)
            },
            async initData() {
                try {
                    const countData = await adminCount();
                    if (countData.status == 1) {
                        // this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getAdmin();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getAdmin()
            },
            async getAdmin() {
                try {
                    const res = await adminList({ offset: this.offset, limit: this.limit });
                    if (res.status == 1) {
                        this.tableData = [];
                        // res.data.forEach(item => {
                        //     const tableItem = {
                        //         create_time: item.create_time,
                        //         user_name: item.user_name,
                        //         admin: item.admin,
                        //         city: item.city,
                        //     }
                        //     this.tableData.push(tableItem)
                        // })
                    } else {
                        throw new Error(res.message)
                    }
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>