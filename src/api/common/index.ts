import request from '@/utils/request';

enum API {
  GET_URL = '/common/getURL',
}

export const reqGetURL = (path: string): Promise<URLResponse> => {
  return request.get(API.GET_URL, {
    params: {
      path: path,
    },
  });
};
