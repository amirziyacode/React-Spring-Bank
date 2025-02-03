export interface User {
  id: string;
  username: string;
  accountNumber: string;
  balance: number;
  password:string;
}

export interface Transaction {
  id: string;
  userId: string;
  methodName: 'Deposit' | 'withdrawal' | 'transfer' | 'viewBalance';
  amount: number;
  recipientId?: string;
  accountNumberTo:string;
  accountNumberFrom:string;
  createdDate: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}