export interface Inventory {
  inventory_Id: number;
  item_Id: number;
  itemName?: string;
  quantity: number;
  location: string;
  last_Updated: Date;
}
