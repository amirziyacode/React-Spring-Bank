import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';
import { CreditCard, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      userId: '1',
      type: 'deposit',
      amount: 500,
      description: 'Salary deposit',
      date: '2024-03-10',
    },
    {
      id: '2',
      userId: '1',
      type: 'withdrawal',
      amount: 100,
      description: 'ATM withdrawal',
      date: '2024-03-09',
    },
  ]);

  const handleDeposit = () => {
    // Implement deposit logic
    console.log('Deposit:', amount);
  };

  const handleWithdraw = () => {
    // Implement withdrawal logic
    console.log('Withdraw:', amount);
  };

  const handleTransfer = () => {
    // Implement transfer logic
    console.log('Transfer:', amount, 'to', recipientEmail);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}!</h2>
              <p className="text-gray-600">Current Balance</p>
              <p className="text-3xl font-bold text-indigo-600">${user?.balance.toFixed(2)}</p>
            </div>
            <CreditCard className="h-12 w-12 text-indigo-600" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Deposit Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <ArrowDownRight className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-semibold">Deposit</h3>
            </div>
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={handleDeposit}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Deposit
            </button>
          </div>

          {/* Withdraw Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <ArrowUpRight className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold">Withdraw</h3>
            </div>
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={handleWithdraw}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Withdraw
            </button>
          </div>

          {/* Transfer Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <History className="h-6 w-6 text-indigo-500 mr-2" />
              <h3 className="text-lg font-semibold">Transfer</h3>
            </div>
            <input
              type="email"
              className="w-full p-2 border rounded mb-4"
              placeholder="Recipient Email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 border rounded mb-4"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={handleTransfer}
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
            >
              Transfer
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.description}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};