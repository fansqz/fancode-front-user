import { BaseResponse, PageInfo, PageQuery } from '../type'

export type SubmissionListRequest = PageQuery & {
  problemID?: number
}

export type Submission = {
  id: number
  problemName: string
  status: number
  errorMessage: string
  createdAt: string
}

export type SubmissionListPageInfo = PageInfo & {
  list: Submission[]
}

export type SubmissionListResponse = BaseResponse & {
  data: SubmissionListPageInfo
}

export type ActivityYearResponse = BaseResponse & {
  data: string[]
}

export type ActivityItem = {
  date: string
  count: number
}

export type ActivityMapResponse = BaseResponse & {
  data: ActivityItem[] | null
}
