export interface IResponse<T> {
  data?: T;
  status?;
  message?;
  access_token?
  refresh_token?
}
export enum EPermission {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_REPORTS = 'VIEW_REPORTS',
  CONFIGURE_SETTINGS = 'CONFIGURE_SETTINGS',
}
