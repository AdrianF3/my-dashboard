import { Timestamp } from "firebase/firestore";
import { Transaction, BankAccount } from '../../../types/Banking.types';

// Updated calcBankDetails function
export const calcBankDetails = (bankAccounts: BankAccount[], transactions: Transaction[]) => {
    const detailedSummaries: Record<string, any> = {};
    const currentBalances: Record<string, number> = {};

    bankAccounts.forEach(account => {
        currentBalances[account.accountID] = account.startingBalance || 0;
        detailedSummaries[account.accountID] = {
            accountID: account.accountID,
            name: account.name,
            type: account.type,
            url: account.url,
            status: account.status,
            startingBalance: account.startingBalance || 0,
            currentBalance: account.startingBalance || 0,
            transactions: []
        };
    });

    transactions.forEach(tx => {
        const account = detailedSummaries[tx.accountID];
        if (account) {
            account.transactions.push(tx);

            if (account.type === 'Checking' || account.type === 'Savings') {
                if (tx.type === 'income') {
                    currentBalances[tx.accountID] += tx.amount;
                } else if (tx.type === 'expense') {
                    currentBalances[tx.accountID] -= tx.amount;
                }
            } else if (account.type === 'Credit Card' || account.type === 'Loan') {
                if (tx.type === 'debt purchase') {
                    currentBalances[tx.accountID] -= tx.amount;
                } else if (tx.type === 'debt payment') {
                    currentBalances[tx.accountID] += tx.amount;
                }
            }
        }
    });

    bankAccounts.forEach(account => {
        detailedSummaries[account.accountID].currentBalance = currentBalances[account.accountID];
    });

    return {
        budgetStartDate: transactions[0]?.date || null,
        budgetEndDate: transactions[transactions.length - 1]?.date || null,
        currentBalances,
        detailedSummaries
    };
};