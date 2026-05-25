import request from '@/config/fetch'

/**
 * 登陆
 */

export function login(data) {
  return request({
    url: '/v1/user/login',
    method: 'post',
    data
  })
}

/**
 * 首页数据
 */
export function queryStaticCount(data) {
  return request({
    url: '/zf/api/v1/complaint/queryStaticCount',
    method: 'post',
    data
  })
}

/**
 * 企业列表
 */
export function getCompanyList(data) {
  // return request({
  //   url: '/zf/api/v1/department/query',
  //   method: 'post',
  //   data
  // })

  return {
    "code": 0, // 业务返回码  0成功  其他 错误
    "msg": "xxx", // 业务错误信息
    "data": {
      "totalCount": 10,
      "list": [
        {
          "id": "1",
          "name": "测试企业1",
          "userName": "法人1",
          "phone": "18260031044",
          "contact": "18260031044",
          "codeNum": "1234567890",
          "address": "啊哈哈哈",
          "deleted": "0",
          "password": "123456",
          "createDate": "2022-03-25 14:36:30",
          "updateDate": "2022-03-25 14:36:32",
          "expand1": "",
          "expand2": "",
          "expand3": ""
        },
        {
          "id": "2",
          "name": "测试企业2",
          "userName": "法人1",
          "phone": "18260031044",
          "contact": "18260031044",
          "codeNum": "1234567890",
          "address": "啊哈哈哈",
          "deleted": "0",
          "password": "123456",
          "createDate": "2022-03-25 14:36:30",
          "updateDate": "2022-03-25 14:36:32",
          "expand1": "",
          "expand2": "",
          "expand3": ""
        }
      ]
    }
  }

}
/**
 * 新增或编辑企业
 */
export function saveOrUpdateCompany(data) {
  return request({
    url: '/zf/api/v1/department/saveOrUpdate',
    method: 'post',
    data
  })
}

/**
 * 删除企业
 */
export function deleteCompany(data) {
  return request({
    url: '/zf/api/v1/department/delete',
    method: 'post',
    data
  })
}



/**
 * 投诉列表
 */
export function getComplaintList(data) {
  return request({
    url: '/zf/api/v1/department/staticList',
    method: 'post',
    data
  })
}



/**************** 用户管理  *************/

/**
 * 用户列表
 */
export function getAdminUser(data) {
  return request({
    url: '/v1/user/query',
    method: 'post',
    data
  })

}

/**
* 新增用户(后台部门用户)
*/
export function addUser(data) {
  return request({
    url: '/v1/user/add',
    method: 'post',
    data
  })
}


/**
 * 新增或编辑用户
 */
export function updateUser(data) {
  return request({
    url: '/v1/user/update',
    method: 'post',
    data
  })
}


/**************** 部门管理  *************/

/**
 *  获取部门列表（不分页）
 */
export function getAllDepartment(data) {
  return request({
    url: '/v1/department/queryNameList',
    method: 'post',
    data
  })

}

/**
* 部门列表 分页
*/
export function getDepartment(data) {
  return request({
    url: '/v1/department/query',
    method: 'post',
    data
  })
}

/**
* 部门新增/编辑
*/
export function saveOrUpdateDepartment(data) {
  return request({
    url: '/v1/department/saveOrUpdate',
    method: 'post',
    data
  })
}

/**
* 部门删除
*/
export function deleteDepartment(data) {
  return request({
    url: '/v1/department/delete',
    method: 'post',
    data
  })
}

/**************** 企业管理  *************/
/**
 * 查询企业列表
 */
export function getEnterpriseList(data) {
  return request({
    url: '/v1/enterprise/query',
    method: 'post',
    data
  })
}
/**
 * 新增/编辑企业
 */
export function addOrUpdateEnterprise(data) {
  return request({
    url: '/v1/enterprise/saveOrUpdate',
    method: 'post',
    data
  })
}
/**
 * 删除企业
 */
export function deleteEnterprise(data) {
  return request({
    url: '/v1/enterprise/delete',
    method: 'post',
    data
  })
}




/**************** 诉求管理  *************/
/**
 * 查询诉求列表
 */
export function getQuestionList(data) {
  return request({
    url: '/v1/appeal/queryList',
    method: 'post',
    data
  })
  // return {
  //   "errCode": 0, // 业务返回码  0成功  其他 错误
  //   "msg": "xxx", // 业务错误信息
  //   "data": {
  //     "totalCount": 10,
  //     "list": [

  //       {
  //         "id": "1", // id 
  //         "appealType": "1", // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
  //         "appealTypeName": "问题咨询", // 诉求类型名称
  //         "enterpriseId": "1", // 企业id
  //         "enterpriseName": "测试企业2", // 企业名称
  //         "enterpriseUserName": "测试法人2", // 企业法人
  //         "enterprisePhone": "18260031044", // 企业联系电话 
  //         "secrecy": false, // 是否保密 
  //         "appealComments": "啊哈哈哈哈哈哈", // 诉求内容
  //         "appealExpandComments": "补充补充#**#补充补充222", // 诉求补充内容
  //         "satisfaction": "0", // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
  //         "appealLevel": "2", // 诉求级别：0未设置、1简单、2一般、3复杂
  //         "createDate": "2022-03-25 14:36:30", // 提交时间
  //         "updateDate": "2022-03-25 14:36:32",
  //         "deleted": "0"// 是否删除 
  //       },
  //       {
  //         "id": "2", // id 
  //         "appealType": "2", // 诉求类型 1问题咨询 2企业需求 3投诉举报 4意见建议
  //         "appealTypeName": "问题咨询", // 诉求类型名称
  //         "enterpriseId": "1", // 企业id
  //         "enterpriseName": "测试企业1", // 企业名称
  //         "enterpriseUserName": "测试法人1", // 企业法人
  //         "enterprisePhone": "18260031044", // 企业联系电话 
  //         "secrecy": true, // 是否保密 
  //         "appealComments": "啊哈哈哈哈哈哈", // 诉求内容
  //         "appealExpandComments": "补充补充#**#补充补充222", // 诉求补充内容
  //         "satisfaction": "0", // 满意度 0未提交满意度、1 满意、2 一般、 3 不满意
  //         "appealLevel": "0", // 诉求级别：0未设置、1简单、2一般、3复杂
  //         "createDate": "2022-03-25 14:36:30", // 提交时间
  //         "updateDate": "2022-03-25 14:36:32",
  //         "deleted": "0"// 是否删除 
  //       }
  //     ]
  //   }
  // }

}

/**
 * 查询诉求分配列表
 */
export function getDistributionList(data) {
  return request({
    url: '/v1/appeal/queryDistributionList',
    method: 'post',
    data
  })
  // return {
  //   "errCode": 0, // 业务返回码  0成功  其他 错误
  //   "msg": "xxx", // 业务错误信息
  //   "data": {
  //     "totalCount": 10,
  //     "list": [

  //       {
  //         "id": 1,
  //         "departmentId": 24,
  //         "departmentName": "部门1",// 部门名称
  //         "distributionTime": "2022-03-25 14:36:30",// 分配时间
  //         "lastDoneTime": "2022-03-25 14:36:35",// 最晚完成时间
  //         "status": 1// 完成状态
  //       },
  //       {
  //         "id": 1,
  //         "departmentId": 24,
  //         "departmentName": "部门1",// 部门名称
  //         "distributionTime": "2022-03-25 14:36:30",// 分配时间
  //         "lastDoneTime": "2022-03-25 14:36:35",// 最晚完成时间
  //         "status": 2// 完成状态
  //       },
  //       {
  //         "id": 1,
  //         "departmentId": 24,
  //         "departmentName": "部门1",// 部门名称
  //         "distributionTime": "2022-03-25 14:36:30",// 分配时间
  //         "lastDoneTime": "2022-03-25 14:36:35",// 最晚完成时间
  //         "status": 3// 完成状态
  //       },
  //       {
  //         "id": 1,
  //         "departmentId": 24,
  //         "departmentName": "部门1",// 部门名称
  //         "distributionTime": "2022-03-25 14:36:30",// 分配时间
  //         "lastDoneTime": "2022-03-25 14:36:35",// 最晚完成时间
  //         "status": 4// 完成状态
  //       },
  //       {
  //         "id": 1,
  //         "departmentId": 24,
  //         "departmentName": "部门1",// 部门名称
  //         "distributionTime": "2022-03-25 14:36:30",// 分配时间
  //         "lastDoneTime": "2022-03-25 14:36:35",// 最晚完成时间
  //         "status": 5// 完成状态
  //       },
  //     ]
  //   }
  // }

}

/**
 * 新增分配 
 */
export function addDistribution(data) {
  return request({
    url: '/v1/appeal/addDistribution',
    method: 'post',
    data
  });
}

/**
 * 撤销分配
 */
export function deleteDistribution(data) {
  return request({
    url: '/v1/appeal/deleteDistribution',
    method: 'post',
    data
  })

}


/**
 * 退回分配
 */
 export function backDistribution(data) {
  return request({
    url: '/v1/appeal/backDistribution',
    method: 'post',
    data
  })

}


/**
 * 查询诉求分配 退回列表
 */

export function getDistributionBackList(data) {
  return request({
    url: '/v1/appeal/queryDistributionBackList',
    method: 'post',
    data
  })

}

/**
 * 查询可分配的部门列表
 */
export function getDistributionDepartmentList(data) {
  return request({
    url: '/v1/appeal/queryDepartmentList',
    method: 'post',
    data
  })
  // return {
  //   "errCode": 0, // 业务返回码  0成功  其他 错误
  //   "msg": "xxx", // 业务错误信息
  //   "data": {
  //     "totalCount": 10,
  //     "list": [

  //       {
  //         "departmentId": 2,
  //         "departmentName": "环境监督部门"
  //       },
  //       {
  //         "departmentId": 5,
  //         "departmentName": "纪委监察"
  //       },
  //       {
  //         "departmentId": 7,
  //         "departmentName": "财政局"
  //       },

  //     ]
  //   }
  // }

}


/**
 * 级别调整
 */
export function setAppealLevel(data) {
  return request({
    url: '/v1/appeal/setAppealLevel',
    method: 'post',
    data
  })

}



/**
 * 查询反馈处理列表
 */
export function getComplaintRecordList(data) {
  return request({
    url: '/v1/appeal/getComplaintRecordList',
    method: 'post',
    data
  })
  // return {
  //   "msg": "成功",
  //   "data": {
  //     "complaintRecordList": [
  //       {
  //         "content": "活动按期开始111",
  //         "timestamp": "2018-04-15",
  //       },
  //       {
  //         "content": "通过审核",
  //         "timestamp": "2018-04-13",
  //       },
  //       {
  //         "content": "创建成功",
  //         "timestamp": "2018-04-11",
  //       },
  //     ]
  //   },
  //   "errCode": 0
  // }
}



/**
 * 查询回复列表
 */
export function getAppealContentList(data) {
  // /v1/appeal/queryReplyList
  return request({
    url: '/v1/appeal/queryReplyList',
    method: 'post',
    data
  })
}


/**
 * 新增/编辑回复
 */
export function setAppealContent(data) {
  return request({
    url: '/v1/appeal/setAppealContent',
    method: 'post',
    data
  })

}

/**
 * 删除回复
 */
export function deleteAppealContent(data) {
  return request({
    url: '/v1/appeal/deleteAppealContent',
    method: 'post',
    data
  })

}

/***
 * 编辑诉求
 * 2022-11.27
 * */ 
 export function updateAppealContent(data) {
  return request({
    url: '/v1/appeal/updateAppealContent' ,
    method: 'post',
    data
  })

}



/*********** 报表 */

/**
 * 查询反馈处理列表
 */
 export function getData1(data) {
  return request({
    url: '/v1/appeal/queryStaticCount',
    method: 'post',
    data
  })

}

/**
 * 查询反馈处理列表
 */
 export function getData2(data) {
  return request({
    url: '/v1/appeal/queryDepartmentDoneCount',
    method: 'post',
    data
  })

}

/**
 * 查询反馈处理列表
 */
 export function getData3(data) {
  return request({
    url: '/v1/appeal/queryAllDisDoneCount',
    method: 'post',
    data
  })

}


