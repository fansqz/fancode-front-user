import request from '@/utils/request';

enum API {
  All_BANK_URL = '/problemBank/all',
}

export const reqAllBankList = (): Promise<any> => {
  return request.get(API.All_BANK_URL);
};
