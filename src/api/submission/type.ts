type SubmissionListRequest = PageQuery & {};

type Submission = {
  id: number;
  problemName: string;
  status: number;
  errorMessage: string;
  createdAt: string;
};

type SubmissionListPageInfo = PageInfo & {
  list: Submission[];
};

type SubmissionListResponse = BaseResponse & {
  data: SubmissionListPageInfo;
};

type ActivityYearResponse = BaseResponse & {
  data: string[];
};

type ActivityItem = {
  date: string;
  count: number;
};

type ActivityMapResponse = BaseResponse & {
  data: ActivityItem[] | null;
};
