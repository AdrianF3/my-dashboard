import React, { useState } from 'react';
import { Transaction } from '../../../types/Banking.types';
import Trends from './MonthlyView/Trends';
import Navigation from './MonthlyView/Navigation';
import CategoryTable from './MonthlyView/CategoryTable';

const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getMonthYearString = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

const generateDateRange = (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    return Array.from({ length: daysInMonth }, (_, index) => {
        return new Date(year, month, index + 1).toISOString().split('T')[0];
    });
};

// New: Generate all months in a year
const generateYearRange = (currentYear: number) => {
    return Array.from({ length: 12 }, (_, index) => {
        return new Date(currentYear, index, 1);
    });
};

const MonthlyView: React.FC<{ budgetDetails: Record<string, any> }> = ({ budgetDetails }) => {
    const initialDate = new Date(budgetDetails.budgetEndDate.toDate().getFullYear(), budgetDetails.budgetEndDate.toDate().getMonth(), 1);
    const [currentDate, setCurrentDate] = useState<Date>(initialDate);
    const [activeTab, setActiveTab] = useState<'monthly' | 'yearly'>('monthly');

    // Get starting balance from all accounts
    const startingBalance = Object.keys(budgetDetails.detailedSummaries).reduce((acc, accountID) => {
        return acc + (budgetDetails.detailedSummaries[accountID].startingBalance || 0);
    }, 0);

    const categories = Array.from(new Set(
        Object.keys(budgetDetails.detailedSummaries).flatMap(accountID =>
            budgetDetails.detailedSummaries[accountID].transactions.map((tx: Transaction) => tx.category)
        )
    ));

    // Move 'Work Income' and 'Misc. Income' to the end of the list
    categories.sort((a, b) => {
        if (a === 'Work Income' || a === 'Misc. Income') return 1;
        if (b === 'Work Income' || b === 'Misc. Income') return -1;
        return a.localeCompare(b);
    });

    // Monthly Calculation
    const allDates = generateDateRange(currentDate);
    const transactionMatrix: Record<string, Record<string, number>> = {};
    const dailyDifferences: Record<string, number> = {};
    const dailyBalances: Record<string, number> = {};
    let runningBalance = startingBalance;

    categories.forEach(category => {
        transactionMatrix[category] = {};
    });

    Object.keys(budgetDetails.detailedSummaries).forEach(accountID => {
        budgetDetails.detailedSummaries[accountID].transactions.forEach((tx: Transaction) => {
            const txDate = tx.date.toDate().toISOString().split('T')[0];
            if (allDates.includes(txDate)) {
                if (!transactionMatrix[tx.category][txDate]) {
                    transactionMatrix[tx.category][txDate] = 0;
                }

                const txAmount = tx.type === 'expense' ? -Math.abs(Number(tx.amount)) : Number(tx.amount);
                transactionMatrix[tx.category][txDate] += txAmount;

                if (tx.type === 'income') {
                    dailyDifferences[txDate] = (dailyDifferences[txDate] || 0) + txAmount;
                } else if (tx.type === 'expense') {
                    dailyDifferences[txDate] = (dailyDifferences[txDate] || 0) - Math.abs(txAmount);
                }
            }
        });
    });

    // Calculate running balance for each day
    allDates.forEach(date => {
        runningBalance += dailyDifferences[date] || 0;
        dailyBalances[date] = runningBalance;
    });

    const totalIncome = Object.values(transactionMatrix)
        .flatMap(cat => Object.values(cat))
        .reduce((acc, amount) => acc + (amount > 0 ? amount : 0), 0);

    const totalExpenses = Object.entries(transactionMatrix)
        .flatMap(([_, transactions]) => Object.values(transactions))
        .reduce((acc, amount) => acc + (amount < 0 ? Math.abs(amount) : 0), 0);

    const monthlyEndingBalance = runningBalance;
    const currentMonthStartingBalance = dailyBalances[allDates[0]] || startingBalance;

    // New: Yearly Calculation
    const currentYear = currentDate.getFullYear();
    const yearlyMonths = generateYearRange(currentYear);

    let yearlyIncome = 0;
    let yearlyExpenses = 0;
    let yearlyStartingBalance = startingBalance;
    let yearlyEndingBalance = startingBalance;

    yearlyMonths.forEach(monthDate => {
        const monthTransactions = Object.values(budgetDetails.detailedSummaries).flatMap((summary: any) => {
            return summary.transactions.filter((tx: Transaction) => tx.date.toDate().getFullYear() === currentYear);
        });
    
        monthTransactions.forEach((tx: Transaction) => {
            const txAmount = tx.type === 'expense' ? -Math.abs(Number(tx.amount)) : Number(tx.amount);
    
            if (tx.type === 'income') {
                yearlyIncome += txAmount;
            } else if (tx.type === 'expense') {
                yearlyExpenses += Math.abs(txAmount);
            }
        });
    });

    yearlyEndingBalance += yearlyIncome - yearlyExpenses;

    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <Navigation
                currentDate={currentDate}
                goToPreviousMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                goToNextMonth={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                getMonthYearString={getMonthYearString}
            />
            <CategoryTable
                categories={categories}
                allDates={allDates}
                transactionMatrix={transactionMatrix}
                dailyDifferences={dailyDifferences}
                dailyBalances={dailyBalances}  // Pass the running balance to the CategoryTable
            />
            <div className='flex flex-col min-w-[250px] max-w-sm justify-center'>
                <h3>Trends</h3>
                {/* Switch between Monthly and Yearly */}
                <button className={`btn ${activeTab === 'monthly' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('monthly')}>
                    Monthly
                </button>
                <button className={`btn ${activeTab === 'yearly' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('yearly')}>
                    Yearly
                </button>
            </div>
            
            {activeTab === 'monthly' && (
                <Trends
                    title={`${getMonthYearString(currentDate)} Trends`}
                    startingBalance={currentMonthStartingBalance}
                    totalIncome={totalIncome}
                    totalExpenses={totalExpenses}
                    difference={totalIncome - totalExpenses}
                    endingBalance={monthlyEndingBalance}
                />
            )}

            {activeTab === 'yearly' && (
                <Trends
                    title={`${currentYear} Yearly Trends`}
                    startingBalance={yearlyStartingBalance}
                    totalIncome={yearlyIncome}
                    totalExpenses={yearlyExpenses}
                    difference={yearlyIncome - yearlyExpenses}
                    endingBalance={yearlyEndingBalance}
                />
            )}
        </div>
    );
};

export default MonthlyView;