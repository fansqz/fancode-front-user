import type { RouteRecordRaw } from 'vue-router';
export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  loginName: string;
  phone: string;
  email: string;
  sex: string;
  username: string;
}
