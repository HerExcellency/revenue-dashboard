const BASE_URL = 'https://fe-task-api.mainstack.io';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Wallet {
  balance: number;
  total_payout: number;
  total_revenue: number;
  pending_payout: number;
  ledger_balance: number;
}

export interface Transaction {
  amount: number;
  metadata: {
    name: string;
    type: string;
    email: string;
    quantity: number;
    country: string;
    product_name: string;
  };
  payment_reference: string;
  status: string;
  type: string;
  date: string;
}

export const api = {
  async getUser(): Promise<User> {
    const response = await fetch(`${BASE_URL}/user`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  },

  async getWallet(): Promise<Wallet> {
    const response = await fetch(`${BASE_URL}/wallet`);
    if (!response.ok) {
      throw new Error('Failed to fetch wallet data');
    }
    return response.json();
  },

  async getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  },
};
