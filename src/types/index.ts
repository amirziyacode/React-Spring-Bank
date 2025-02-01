export interface User {
  id: string;
  username: string;
  accountNumber: string;
  balance: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  recipientId?: string;
  description: string;
  date: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}