import request from '@/utils/request';

enum API {
  All_BANK_URL = '/problemBank/all',
  BANK_URL = '/problemBank',
}

export const reqAllBankList = (): Promise<AllBankListResponse> => {
  return request.get(API.All_BANK_URL);
};

export const reqBank = (bankID: string): Promise<BankResponse> => {
  return request.get(API.BANK_URL + `/${bankID}`);
};
