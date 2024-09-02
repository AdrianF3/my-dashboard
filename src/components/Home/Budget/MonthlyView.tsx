import React, { useState, useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { Transaction } from '../../../types/Banking.types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the month and year as a string
const getMonthYearString = (date: Date): string => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

const MonthlyView: React.FC<{ budgetDetails: Record<string, any> }> = ({ budgetDetails }) => {
    // Initialize currentDate using budgetEndDate from budgetDetails
    const initialDate = budgetDetails.budgetEndDate.toDate();
    const [currentDate, setCurrentDate] = useState<Date>(initialDate);
    const [previousMonthEndingBalance, setPreviousMonthEndingBalance] = useState<number | null>(null);

    // Extract unique categories from transactions and sort them with "Work Income" and "Misc. Income" last
    const categories = Array.from(new Set(
        Object.keys(budgetDetails.detailedSummaries).flatMap(accountID =>
            budgetDetails.detailedSummaries[accountID].transactions.map((tx: Transaction) => tx.category)
        )
    )).sort((a, b) => {
        if (a === 'Work Income' || a === 'Misc. Income') return 1;
        if (b === 'Work Income' || b === 'Misc. Income') return -1;
        return a.localeCompare(b);
    });

    // Calculate the number of days in the current month
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

    // Create a matrix to store sums of transactions per category per day
    const transactionMatrix: Record<string, number[]> = categories.reduce((acc, category) => {
        acc[category] = Array(daysInMonth).fill(0);
        return acc;
    }, {} as Record<string, number[]>);

    // Populate the transactionMatrix with actual sums
    Object.keys(budgetDetails.detailedSummaries).forEach(accountID => {
        budgetDetails.detailedSummaries[accountID].transactions.forEach((tx: Transaction) => {
            const txDate = tx.date.toDate();
            const txDay = txDate.getDate();
            const txMonth = txDate.getMonth();
            const txYear = txDate.getFullYear();

            // Ensure the transaction is in the currently viewed month
            if (txMonth === currentDate.getMonth() && txYear === currentDate.getFullYear()) {
                transactionMatrix[tx.category][txDay - 1] += tx.amount;
            }
        });
    });

    // Calculate totals for each category
    const categoryTotals: Record<string, number> = categories.reduce((acc, category) => {
        acc[category] = transactionMatrix[category].reduce((sum, amount) => sum + amount, 0);
        return acc;
    }, {} as Record<string, number>);

    // Calculate the running balance and trends
    const accountStartingBalance = budgetDetails.detailedSummaries[Object.keys(budgetDetails.detailedSummaries)[0]].startingBalance || 0;
    let runningBalance = previousMonthEndingBalance !== null ? previousMonthEndingBalance : accountStartingBalance;
    const dailyBalances: number[] = [];

    let totalIncome = 0;
    let totalExpenses = 0;

    for (let i = 0; i < daysInMonth; i++) {
        let dailyIncome = 0;
        let dailyExpenses = 0;

        categories.forEach(category => {
            const amount = transactionMatrix[category][i];
            if (category === 'Work Income' || category === 'Misc. Income') {
                dailyIncome += amount;
            } else {
                dailyExpenses += amount;
            }
        });

        totalIncome += dailyIncome;
        totalExpenses += dailyExpenses;
        runningBalance += (dailyIncome - dailyExpenses);
        dailyBalances.push(runningBalance);
    }

    const difference = totalIncome - totalExpenses;
    const monthlyEndingBalance = dailyBalances[daysInMonth - 1];

    // Calculate the previous month's ending balance when the component mounts or when the month changes
    useEffect(() => {
        const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        let prevMonthRunningBalance = accountStartingBalance;

        if (prevMonthDate >= budgetDetails.budgetStartDate.toDate()) {
            // Calculate the running balance for the previous month
            Object.keys(budgetDetails.detailedSummaries).forEach(accountID => {
                const prevMonthTransactions = budgetDetails.detailedSummaries[accountID].transactions.filter((tx: Transaction) => {
                    const txDate = tx.date.toDate();
                    return txDate.getMonth() === prevMonthDate.getMonth() && txDate.getFullYear() === prevMonthDate.getFullYear();
                });

                prevMonthTransactions.forEach(tx => {
                    if (tx.category === 'Work Income' || tx.category === 'Misc. Income') {
                        prevMonthRunningBalance += tx.amount;
                    } else {
                        prevMonthRunningBalance -= tx.amount;
                    }
                });
            });
        }

        setPreviousMonthEndingBalance(prevMonthRunningBalance);
    }, [currentDate, budgetDetails.budgetStartDate, budgetDetails.detailedSummaries, accountStartingBalance]);

    // Handlers to navigate months
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousMonth} className="btn btn-secondary">
                    <FaChevronLeft />
                </button>
                <h2 className="text-lg font-bold">{getMonthYearString(currentDate)}</h2>
                <button onClick={goToNextMonth} className="btn btn-secondary">
                    <FaChevronRight />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-2 bg-slate-300">Category / Day</th>
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <th key={i} className="border p-2 bg-slate-300">{i + 1}</th>
                            ))}
                            <th className="border p-2 bg-slate-300">Total</th>
                            <th className="border p-2 bg-slate-300">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, rowIndex) => (
                            <React.Fragment key={category}>
                                <tr className={rowIndex % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}>
                                    <td className="border p-2 font-bold">{category}</td>
                                    {transactionMatrix[category].map((amount, index) => (
                                        <td key={index} className="border p-2 text-right">
                                            {amount > 0 ? `$${amount.toFixed(2)}` : '-'}
                                        </td>
                                    ))}
                                    <td className="border p-2 font-bold text-right bg-slate-300">
                                        ${categoryTotals[category].toFixed(2)}
                                    </td>
                                    <td className="border p-2 font-bold">{category}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-slate-300">
                            <td className="border p-2 font-bold">Running Balance</td>
                            {dailyBalances.map((balance, index) => (
                                <td key={index} className="border p-2 text-right font-bold">
                                    ${balance.toFixed(2)}
                                </td>
                            ))}
                            <td className="border p-2 font-bold text-right bg-slate-400">
                                ${monthlyEndingBalance.toFixed(2)}
                            </td>
                            <td className="border p-2 font-bold">Balance</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {/* Trends Section */}
            <div className="mt-4 p-4 bg-slate-700/20 rounded">
                <h3 className="text-lg font-bold mb-2">Trends</h3>
                <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
                <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
                <p><strong>Difference:</strong> ${difference.toFixed(2)}</p>
                <p><strong>Monthly Ending Balance:</strong> ${monthlyEndingBalance.toFixed(2)}</p>
                {previousMonthEndingBalance !== null && (
                    <p><strong>Compared to Previous Month:</strong> {monthlyEndingBalance >= previousMonthEndingBalance ? '+' : '-'}${Math.abs(monthlyEndingBalance - previousMonthEndingBalance).toFixed(2)}</p>
                )}
            </div>
        </div>
    );
};

export default MonthlyView;