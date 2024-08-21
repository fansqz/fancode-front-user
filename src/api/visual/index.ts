import request from '@/utils/request';
import {
  VisualizeRequest,
  VisualizeResponse,
  VisualizeDescriptionTemplateResponse,
  VisualizeDescriptionTemplateListResponse,
} from './type';

enum API {
  VISUALIZE_URL = '/visualize/debug',
  TEMPLATE_URL = '/visualize/template',
}

// 可视化数据结构请求
export const reqVisualize = (data: VisualizeRequest): Promise<VisualizeResponse> => {
  return request.post(API.VISUALIZE_URL, data);
};

export const reqAllDescriptionTemplate = (): Promise<VisualizeDescriptionTemplateListResponse> => {
  return request.get(`${API.TEMPLATE_URL}/list`);
};

export const reqDescriptionTemplate = (
  type: string,
): Promise<VisualizeDescriptionTemplateResponse> => {
  return request.get(`${API.TEMPLATE_URL}/${type}`);
};
