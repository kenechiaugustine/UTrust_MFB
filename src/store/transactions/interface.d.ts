interface ITransactions {
  _id: string;
  user: string;
  prevBalance: number;
  newBalance: number;
  amount: number;
  transactionType: 'credit' | 'debit';
  modeOfTransaction: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
