export type OptionType = {
  value: string | number;
  label: string;
};

export interface OptionTreeType {
  label: string;
  value: string;
  children?: OptionTreeType[];
}

export type TreeOptionType = {
  children?: TreeOptionType[];
  id: number;
  name: string;
  parentId: number;
  ruName: string;
  type: string;
};
