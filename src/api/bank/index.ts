import request from '@/utils/request'

import { AllBankListResponse, BankResponse } from './type'

enum API {
  AllBankURL = '/problemBank/all',
  BankURL = '/problemBank',
}

export const reqAllBankList = (): Promise<AllBankListResponse> => {
  return request.get(API.AllBankURL)
}

export const reqBank = (bankID: number): Promise<BankResponse> => {
  return request.get(API.BankURL + `/${bankID}`)
}
