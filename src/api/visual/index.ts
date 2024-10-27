import request from '@/utils/request';
import {
  StructVisualRequest,
  VariableVisualRequest,
  StructVisualResponse,
  VariableVisualResponse,
  VisualDescriptionTemplateResponse,
  VisualDescriptionTemplateListResponse,
  SaveVisualSettingRequest,
  SaveVisualSettingResponse,
  GetVisualSettingRequest,
  GetVisualSettingResponse,
} from './type';

enum API {
  VisaulURL = '/visual/debug',
  TemplateURL = '/visual/template',
  Setting = '/visual/setting',
}

export const reqSaveVisualSetting = (data: SaveVisualSettingRequest): Promise<SaveVisualSettingResponse> => {
  return request.post(`${API.Setting}/save`, data);
};

export const reqGetVisualSetting = (data: GetVisualSettingRequest): Promise<GetVisualSettingResponse> => {
  return request.get(`${API.Setting}/${data.problemID}/${data.language}`);
};

export const reqStructVisual = (data: StructVisualRequest): Promise<StructVisualResponse> => {
  return request.post(`${API.VisaulURL}/struct`, data);
};

export const reqVariableVisual = (data: VariableVisualRequest): Promise<VariableVisualResponse> => {
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
