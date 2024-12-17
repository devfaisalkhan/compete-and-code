import { EPermission } from "src/shared/shared.model";

export interface IRole {
  id: string;
  name: string;
  description?: string;
  permissions: EPermission[];
  parentRoleId?: string; 
}
  