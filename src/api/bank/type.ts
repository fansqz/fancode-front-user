import { BaseResponse } from '../type'

export type ProblemBankForList = {
  id: number
  icon: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  creatorName: string
  problemCount: number
}

export type AllBankListResponse = BaseResponse & {
  data: ProblemBankForList[]
}

export type ProblemBankForGet = {
  id: number
  name: string
  icon: string
  description: string
  creatorID: number
  createdAt: string
  updatedAt: string
}

export type BankResponse = BaseResponse & {
  data: ProblemBankForGet
}
