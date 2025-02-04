import { useState} from 'react';
import { useAuth } from '../context/AuthContext';
import { Transaction } from '../types';
import { CreditCard, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import './css/account.css'
import axios from 'axios';

export const Dashboard = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [blanace,setBalance] = useState(user?.balance);
  const [accountNumberTransfer, setRecipientEmail] = useState('');
  const [transactions,seTransactions] = useState<Transaction[]>([]);

  // @** // 
  //TODO:get User from import axios from 'axios' connect to backend with basic auth;
  // find user by username in {SpringBoot}
  const getUser = async() => { 
    // Endcode Your Data {username,password}
    const authHeader = `Basic ${btoa(`${user?.username}:${user?.password}`)}`; 
    // get user from url in Api
    const getUser = await axios.get("http://localhost:8080/auth/user",{
      headers: {
        'Authorization': authHeader
      },
        params:{
          userName:user?.username
        }
      });
      setBalance(getUser.data.amount)
   }
  // @**
  
  
  const fetchTransactions = async() => {
    const authHeader = `Basic ${btoa(`${user?.username}:${user?.password}`)}`;
    const response = await axios.get(`http://localhost:8080/bank/transactions/${user?.id}`,{
        headers: {
          'Authorization': authHeader
        },
      }
    );
    seTransactions(response.data);
  }

  const handleDeposit = async() => {
    const authHeader = `Basic ${btoa(`${user?.username}:${user?.password}`)}`; 
      const respone = fetch(`http://localhost:8080/bank/deposit/${user?.accountNumber}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader
        },
        body: JSON.stringify({ amount:amount })
      });
    if((await respone).status === 200){
      fetchTransactions();
      getUser();
    }
  };


  const handleWithdraw = async() => {
    const authHeader = `Basic ${btoa(`${user?.username}:${user?.password}`)}`; 
    const respone =  fetch(`http://localhost:8080/bank/withdrawal/${user?.accountNumber}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader
      },
      body: JSON.stringify({ amount:amount})
      });
    if((await respone).status === 200){
      fetchTransactions();
      getUser();
    }
  };

  const handleTransfer = async() => {
    const authHeader = `Basic ${btoa(`${user?.username}:${user?.password}`)}`; 
    const respone =  fetch(`http://localhost:8080/bank/transfer/${user?.accountNumber}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": authHeader
      },
      body: JSON.stringify({ 
        accountNumber:accountNumberTransfer,
        amount:amount 
      })
    });
    if((await respone).status === 200){
      fetchTransactions();
      getUser();
    }
    console.log('Transfer:', amount, 'to', accountNumberTransfer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome, {user?.username}!</h2>
              <p className="text-gray-600">Current Balance</p>
              <p className="text-3xl font-bold text-indigo-600">${blanace?.toFixed(2)}</p>
            </div>
            <p className='accountNumber' >{user?.accountNumber}</p>
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
              placeholder="Account Number"
              value={accountNumberTransfer}
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
        <div className="bg-white rounded-lg shadow-lg p-6" onClick={fetchTransactions}>
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
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
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
                      {new Date(transaction.createdDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.methodName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.accountNumberFrom}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.accountNumberTo}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      transaction.methodName === 'Deposit'? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.methodName === 'Deposit'? '+' : '-'}${transaction.amount}
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
