export type User = {
  id: number;
  firstName: string;
  lastName: string;
};

export type DictionaryItem = {
  label: string;
  parentId?: string;
  children?: DictionaryItem[];
};
