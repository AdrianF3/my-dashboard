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
            type: account.type,  // Checking or Savings only
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
    const viewOptions = 'Month';
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



