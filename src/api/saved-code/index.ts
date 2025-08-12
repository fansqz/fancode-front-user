import request from '@/utils/request'

import {
  CreateSavedCodeRequest,
  UpdateSavedCodeRequest,
  GetSavedCodeListQuery,
  CreateSavedCodeResponse,
  UpdateSavedCodeResponse,
  GetSavedCodeListResponse,
  GetSavedCodeDetailResponse,
  DeleteSavedCodeResponse,
} from './type'

enum API {
  // 创建用户保存的代码
  CreateSavedCode = '/user/savedCode',
  // 更新用户保存的代码
  UpdateSavedCode = '/user/savedCode',
  // 获取用户保存的代码列表
  GetSavedCodeList = '/user/savedCode/list',
  // 根据ID获取用户保存的代码详情
  GetSavedCodeDetail = '/user/savedCode',
  // 删除用户保存的代码
  DeleteSavedCode = '/user/savedCode',
  // 更新单个代码的排序顺序
  UpdateSort = '/user/savedCode/sort',
  // 批量更新排序顺序
  BatchUpdateSort = '/user/savedCode/batch-sort',
}

/**
 * 创建用户保存的代码
 * @param data 创建代码的请求参数
 * @returns Promise<CreateSavedCodeResponse>
 */
export const reqCreateSavedCode = (
  data: CreateSavedCodeRequest,
): Promise<CreateSavedCodeResponse> => {
  return request.post(API.CreateSavedCode, data)
}

/**
 * 更新用户保存的代码
 * @param data 更新代码的请求参数
 * @returns Promise<UpdateSavedCodeResponse>
 */
export const reqUpdateSavedCode = (
  data: UpdateSavedCodeRequest,
): Promise<UpdateSavedCodeResponse> => {
  return request.put(API.UpdateSavedCode, data)
}

/**
 * 获取用户保存的代码列表
 * @param params 查询参数
 * @returns Promise<GetSavedCodeListResponse>
 */
export const reqGetSavedCodeList = (
  params: GetSavedCodeListQuery,
): Promise<GetSavedCodeListResponse> => {
  return request.get(API.GetSavedCodeList, {
    params,
  })
}

/**
 * 根据ID获取用户保存的代码详情
 * @param id 代码ID
 * @returns Promise<GetSavedCodeDetailResponse>
 */
export const reqGetSavedCodeDetail = (id: number): Promise<GetSavedCodeDetailResponse> => {
  return request.get(`${API.GetSavedCodeDetail}/${id}`)
}

/**
 * 删除用户保存的代码
 * @param id 代码ID
 * @returns Promise<DeleteSavedCodeResponse>
 */
export const reqDeleteSavedCode = (id: number): Promise<DeleteSavedCodeResponse> => {
  return request.delete(`${API.DeleteSavedCode}/${id}`)
}
