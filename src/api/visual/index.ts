import request from '@/utils/request';
import {
  StructVisualRequest,
  VariableVisualRequest,
  StructVisualResponse,
  VariableVisualResponse,
  VisaulDocumentResponse,
  VisualDescriptionResponse,
} from './type';

enum API {
  VisaulURL = '/visual/debug',
  DocumentURL = '/visual/document',
}

export const reqGetVisualDescription = (debugID: string): Promise<VisualDescriptionResponse> => {
  return request.get(`${API.VisaulURL}/description/${debugID}`);
};

export const reqStructVisual = (data: StructVisualRequest): Promise<StructVisualResponse> => {
  return request.post(`${API.VisaulURL}/struct`, data);
};

export const reqVariableVisual = (data: VariableVisualRequest): Promise<VariableVisualResponse> => {
  return request.post(`${API.VisaulURL}/variable`, data);
};

export const reqVisaulDocument = (): Promise<VisaulDocumentResponse> => {
  return request.get(`${API.DocumentURL}`);
};
