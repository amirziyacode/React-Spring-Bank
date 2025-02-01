export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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