export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export type DictionaryItem = {
  id: string;
  label: string;
  parentId?: string;
  isFolder?: boolean;
  children?: DictionaryItem[];
};
