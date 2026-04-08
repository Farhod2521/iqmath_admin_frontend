// types.ts
export type MainModalType = "create" | "edit" | null;

export interface MyGroupsData {
  id: number;
  name: string;
  students: any[];
  [key: string]: any;
}

export interface MyGroupsFormData {
  name: string;
  teacher_id: number;
  students?: number[];
}

export interface StudentType {
  id: number;
  full_name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}
