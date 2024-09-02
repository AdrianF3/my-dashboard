import { Timestamp } from "firebase/firestore";
import { Transaction, BankAccount } from '../../../types/Banking.types';

interface TimelineEntry {
    date: Date;
    [accountID: string]: any; // Allow dynamic keys with any value, though we expect numbers
}

// Updated calcBankDetails function with Recharts-compatible timelineData
export const calcBankDetails = (bankAccounts: BankAccount[], transactions: Transaction[]) => {
    const detailedSummaries: Record<string, any> = {};
    const currentBalances: Record<string, number> = {};
    const timelineData: TimelineEntry[] = [];

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
            transactions: [],
            visible: true
        };
    });

    transactions.forEach(tx => {
        // Ensure correct category for income transactions
        if (tx.type === 'income') {
            if (tx.category !== 'Work Income' && tx.category !== 'Misc. Income') {
                tx.category = Math.random() > 0.5 ? 'Work Income' : 'Misc. Income';
            }
        }

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

            const transactionDate = tx.date.toDate();
            let timelineEntry = timelineData.find(entry => entry.date.getTime() === transactionDate.getTime());

            if (!timelineEntry) {
                timelineEntry = { date: transactionDate };
                timelineData.push(timelineEntry);
            }

            timelineEntry[tx.accountID] = currentBalances[tx.accountID];
        }
    });

    // Sort timeline data by date
    timelineData.sort((a, b) => a.date.getTime() - b.date.getTime());

    bankAccounts.forEach(account => {
        detailedSummaries[account.accountID].currentBalance = currentBalances[account.accountID];
    });

    const budgetStartDate = transactions[0]?.date || null;
    const budgetEndDate = transactions[transactions.length - 1]?.date || null;
    const viewOptions = 'Transaction';
    const sortOptions = 'Descending';

    return {
        budgetStartDate,
        budgetEndDate,
        displayStartDate: budgetStartDate,
        displayEndDate: budgetEndDate,
        currentBalances,
        detailedSummaries,
        viewOptions,
        sortOptions,
        timelineData
    };
};

// Sample function to generate 150 transactions
export const generateSampleTransactions = (): Transaction[] => {
    const categories = ['Groceries', 'Rent', 'Utilities', 'Work Income', 'Misc. Income', 'Dining', 'Entertainment'];
    const types = ['expense', 'income', 'debt purchase', 'debt payment'];
    const bankAccountIDs = ['account1', 'account2', 'account3'];

    const transactions: Transaction[] = [];

    for (let i = 0; i < 150; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        let category = categories[Math.floor(Math.random() * categories.length)];

        if (type === 'income') {
            category = Math.random() > 0.5 ? 'Work Income' : 'Misc. Income';
        }

        transactions.push({
            id: `tx-${i}`,
            accountID: bankAccountIDs[Math.floor(Math.random() * bankAccountIDs.length)],
            date: Timestamp.fromDate(new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)),
            description: `Sample transaction ${i + 1}`,
            amount: parseFloat((Math.random() * 500 + 50).toFixed(2)),
            type,
            category
        });
    }

    return transactions;
};