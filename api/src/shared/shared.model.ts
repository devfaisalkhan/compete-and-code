export interface IResponse<T> {
  data?: T;
  status?;
  message?;
  access_token?
  refresh_token?
}
export enum EPermission {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
