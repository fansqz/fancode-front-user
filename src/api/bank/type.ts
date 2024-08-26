type ProblemBankForList = {
  id: number
  icon: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  creatorName: string
  problemCount: number
};

type AllBankListResponse = BaseResponse & {
  data: ProblemBankForList[];
};

type ProblemBankForGet = {
  id: number
  name: string
  icon: string
  description: string
  creatorID: number
  createdAt: string
  updatedAt: string
};

type BankResponse = BaseResponse & {
  data: ProblemBankForGet
};
