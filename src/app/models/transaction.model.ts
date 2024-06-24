export interface Transaction {
  transaction_Id: number;
  item_Id: number;
  user_Id: number;
  transaction_Type: string;
  quantity: number;
  transaction_Date: Date;
  notes: string;
}
