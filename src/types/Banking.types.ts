import { Timestamp } from "firebase/firestore";

// Types for Banking and other related data

export interface Transaction {
    date: Timestamp; 
    type: 'income' | 'expense' | 'debt purchase' | 'debt payment';
    amount: number; 
    category: string;
    id: string;
    tags?: string[];
    notes?: string;
    description: string;
    accountID: string;
    recurring?: boolean;
}

export interface BankAccount {
    type: 'Checking' | 'Savings' | 'Credit Card' | 'Loan';
    name: string;
    url: string;
    notes?: string;
    status?: 'active' | 'closed';
    startingBalance?: number;
    accountStartDate: Timestamp;
    accountID: string;
}



// Placeholder data

export const bankAccounts: BankAccount[] = [
    {
        type: 'Checking',
        name: 'Personal Checking',
        url: 'https://www.bank.com/personal-checking',
        notes: 'Primary checking account for daily expenses',
        status: 'active',
        accountID: 'acc001',
        startingBalance: 1000,
        accountStartDate: Timestamp.fromDate(new Date(2024, 5, 0o1))
    },
    {
        type: 'Savings',
        name: 'Emergency Fund',
        url: 'https://www.bank.com/emergency-fund',
        notes: 'Savings for unexpected expenses',
        status: 'active',
        accountID: 'acc002',
        startingBalance: 2500,
        accountStartDate: Timestamp.fromDate(new Date(2024, 5, 0o1))
    },
    {
        type: 'Credit Card',
        name: 'Rewards Credit Card',
        url: 'https://www.bank.com/rewards-credit-card',
        notes: 'Use for all online purchases',
        status: 'active',
        accountID: 'acc003',
        accountStartDate: Timestamp.fromDate(new Date(2024, 5, 0o1))
    }
];



// Utility function to generate a random amount between a range
const getRandomAmount = (min: number, max: number) => {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Utility function to generate a random category
const getRandomCategory = () => {
    const categories = ['Groceries', 'Rent', 'Utilities', 'Dining', 'Entertainment', 'Transport', 'Health', 'Shopping'];
    return categories[Math.floor(Math.random() * categories.length)];
};

// Utility function to generate random descriptions
const getRandomDescription = (category: string) => {
    const descriptions: { [key: string]: string[] } = {
        Groceries: ['Grocery shopping at SuperMart', 'Bought groceries at FreshFarm', 'Weekly grocery haul'],
        Rent: ['Monthly rent payment', 'Rent paid for apartment', 'Housing rent'],
        Utilities: ['Electricity bill payment', 'Water bill', 'Gas bill'],
        Dining: ['Dinner at Italian Bistro', 'Lunch at Sushi Place', 'Fast food order'],
        Entertainment: ['Movie tickets', 'Concert tickets', 'Streaming service subscription'],
        Transport: ['Bus pass', 'Gas station fuel', 'Taxi ride'],
        Health: ['Pharmacy purchase', 'Doctor visit', 'Gym membership'],
        Shopping: ['Clothing purchase', 'Online shopping at Amazon', 'Electronics bought'],
    };
    const options = descriptions[category] || ['Miscellaneous expense'];
    return options[Math.floor(Math.random() * options.length)];
};

// Determine transaction type based on account type
const getTransactionType = (accountType: BankAccount['type']): Transaction['type'] => {
    switch (accountType) {
        case 'Checking':
        case 'Savings':
            return Math.random() > 0.5 ? 'income' : 'expense';
        case 'Credit Card':
        case 'Loan':
            return Math.random() > 0.5 ? 'debt purchase' : 'debt payment';
        default:
            return 'expense'; // Default to 'expense' if account type is unknown
    }
};

// Placeholder data for 100 transactions
export const transactions: Transaction[] = Array.from({ length: 100 }, (_, i) => {
    const month = Math.floor(i / 33) + 5; // Spread across 3 months (May, June, July)
    const day = (i % 30) + 1;
    const date = new Date(2024, month - 1, day); // Months are 0-indexed in JS Date
    const category = getRandomCategory();
    const accountID = `acc00${(i % 3) + 1}`; // Cycling through 3 different accounts
    const accountType = bankAccounts.find(acc => acc.accountID === accountID)?.type || 'Checking';
    const type = getTransactionType(accountType);

    return {
        date: Timestamp.fromDate(date),
        amount: getRandomAmount(10, 500),
        category,
        type,
        id: `tx${String(i + 1).padStart(3, '0')}`,
        description: getRandomDescription(category),
        accountID,
        recurring: category === 'Rent' || category === 'Utilities' ? true : false,
    };
});

