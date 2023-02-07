export interface TaxItem {
  _id: string;
  receiptNumber: string;
  createdAt: string;
  status: string;
  updatedBy: TaxUser;
}

interface TaxUser {
  _id: string;
  name: string;
}
