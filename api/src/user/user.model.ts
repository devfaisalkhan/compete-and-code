import { EPermission } from "src/shared/shared.model";

export interface IRole {
  name: string;
  description?: string;
  permissions: EPermission[];
}
  