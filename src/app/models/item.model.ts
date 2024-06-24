export interface Item {
  item_Id: number;
  item_Name: string;
  description: string;
  category_Id?: number;
  created_At: Date;
}
