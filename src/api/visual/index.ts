import request from '@/utils/request';
import {
  StructVisualRequest,
  VariableVisualRequest,
  StructVisualResponse,
  VariableVisualResponse,
  VisualDescriptionTemplateResponse,
  VisualDescriptionTemplateListResponse,
} from './type';

enum API {
  VisaulURL= '/visual/debug',
  TemplateURL = '/visual/template',
  Setting = '/visaul/setting'
}

export const reqStructVisual = (
  data: StructVisualRequest,
): Promise<StructVisualResponse> => {
  return request.post(`${API.VisaulURL}/struct`, data);
};

export const reqVariableVisual = (
  data: VariableVisualRequest,
): Promise<VariableVisualResponse> => {
  return request.post(`${API.VisaulURL}/variable`, data);
};

export const reqAllDescriptionTemplate = (): Promise<VisualDescriptionTemplateListResponse> => {
  return request.get(`${API.TemplateURL}/list`);
};

export const reqDescriptionTemplate = (
  type: string,
): Promise<VisualDescriptionTemplateResponse> => {
  return request.get(`${API.TemplateURL}/${type}`);
};
