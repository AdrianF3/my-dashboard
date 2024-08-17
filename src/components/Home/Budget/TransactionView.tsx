import React from 'react';
import { Transaction } from '../../../types/Banking.types';

const TransactionView: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
    const sortedTransactions = [...transactions].sort((a, b) => b.date.toDate().getTime() - a.date.toDate().getTime());

    // function to return bg-color for transaction
    const calcBGColor = (type: string) => {
        if (type === 'income' || type === 'debt payment') {
            return 'bg-green-300'
        } else {
            return 'bg-red-300'
        }
    }


    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Transactions</h2>
            {sortedTransactions.map(tx => (
                <div key={tx.id} className={`mb-4 ${calcBGColor(tx.type)}`}>
                    <p><strong>Date:</strong> {tx.date.toDate().toLocaleDateString()}</p>                    
                    <p><strong>Description:</strong> {tx.description}</p>
                    <p><strong>Amount:</strong> ${tx.amount.toFixed(2)} 
                    <span className='text-sm italic text-slate-500 px-2'>{tx.type}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TransactionView;
