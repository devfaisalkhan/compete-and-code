export interface IResponse<T> {
  data?: T;
  status?;
  message?;
  totalItems?;
  access_token?
  refresh_token?
}
export enum EPermission {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
