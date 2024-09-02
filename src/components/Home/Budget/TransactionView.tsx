import React from 'react';
import { Transaction } from '../../../types/Banking.types';

const TransactionView: React.FC<{ budgetDetails: Record<string, any> }> = ({ budgetDetails }) => {
    // Combine transactions from all visible accounts
    const visibleTransactions: Transaction[] = Object.keys(budgetDetails.detailedSummaries)
        .filter(accountID => budgetDetails.detailedSummaries[accountID].visible) // Filter for visible accounts
        .flatMap(accountID => budgetDetails.detailedSummaries[accountID].transactions); // Combine transactions

    // Sort the transactions based on user preference
    const sortedTransactions = [...visibleTransactions].sort((a, b) => {
        const dateA = a.date.toDate().getTime();
        const dateB = b.date.toDate().getTime();

        if (budgetDetails.sortOptions === 'Ascending') {
            return dateA - dateB; // Oldest first
        } else {
            return dateB - dateA; // Newest first (default)
        }
    });

    // Function to return bg-color for transaction
    const calcBGColor = (type: string) => {
        if (type === 'income' || type === 'debt payment') {
            return 'bg-green-300';
        } else {
            return 'bg-red-300';
        }
    };

    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Transactions</h2>
            {sortedTransactions.length > 0 ? (
                sortedTransactions.map(tx => (
                    <div key={tx.id} className={`mb-4 ${calcBGColor(tx.type)}`}>
                        <p><strong>Date:</strong> {tx.date.toDate().toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {tx.description}</p>
                        <p><strong>Amount:</strong> ${tx.amount.toFixed(2)} 
                        <span className='text-sm italic text-slate-500 px-2'>{tx.type}</span>
                        </p>
                    </div>
                ))
            ) : (
                <p>No transactions available for the selected accounts.</p>
            )}
        </div>
    );
};

export default TransactionView;