import { toFormData } from '@/utils/format'
import request from '@/utils/request'

import { SubmissionListRequest, SubmissionListResponse, ActivityYearResponse } from './type'

enum API {
  ActiveYearURL = '/submission/active/year',
  ActiveMapURL = '/submission/active/map',
  SubmissionURL = '/submission/list',
  AddRemarkURL = '/submission/add/remark',
}

// 获取用户提交列表
export const reqSubmissionList = (data: SubmissionListRequest): Promise<SubmissionListResponse> => {
  return request.get(API.SubmissionURL, {
    params: data,
  })
}

// 获取用户有提交的年份
export const reqActivityYear = (): Promise<ActivityYearResponse> => {
  return request.get(API.ActiveYearURL)
}

// 获取用户活动图
export const reqActivityMap = (year: string): Promise<any> => {
  return request.get(API.ActiveMapURL + `/${year}`)
}

// 给提交添加备注
export const reqAddRemark = (id: number, remark: string): Promise<any> => {
  return request.post(
    API.AddRemarkURL,
    toFormData({
      id: id,
      remark: remark,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
