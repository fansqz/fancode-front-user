import request from '@/utils/request';
import {
  StructVisualizeRequest,
  VariableVisualizeRequest,
  StructuralVisualizeResponse,
  VariableVisualizeResponse,
  VisualizeDescriptionTemplateResponse,
  VisualizeDescriptionTemplateListResponse,
} from './type';

enum API {
  VISUALIZE_URL = '/visualize/debug',
  TEMPLATE_URL = '/visualize/template',
}

export const reqStructVisualize = (
  data: StructVisualizeRequest,
): Promise<StructuralVisualizeResponse> => {
  return request.post(`${API.VISUALIZE_URL}/struct`, data);
};

export const reqVariableVisualize = (
  data: VariableVisualizeRequest,
): Promise<VariableVisualizeResponse> => {
  return request.post(`${API.VISUALIZE_URL}/variable`, data);
};

export const reqAllDescriptionTemplate = (): Promise<VisualizeDescriptionTemplateListResponse> => {
  return request.get(`${API.TEMPLATE_URL}/list`);
};

export const reqDescriptionTemplate = (
  type: string,
): Promise<VisualizeDescriptionTemplateResponse> => {
  return request.get(`${API.TEMPLATE_URL}/${type}`);
};
