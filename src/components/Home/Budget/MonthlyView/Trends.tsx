import React from 'react';

interface TrendsProps {
    title: string;
    startingBalance: number;
    totalIncome: number;
    totalExpenses: number;
    difference: number;
    endingBalance: number;
}

const Trends: React.FC<TrendsProps> = ({ title, startingBalance, totalIncome, totalExpenses, difference, endingBalance }) => {
    return (
        <div className="mt-4 p-4 bg-slate-700/20 rounded">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p><strong>Starting Balance:</strong> ${startingBalance.toFixed(2)}</p>
            <p><strong>Total Income:</strong> ${totalIncome.toFixed(2)}</p>
            <p><strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}</p>
            <p><strong>Difference:</strong> ${difference.toFixed(2)}</p>
            <p><strong>Ending Balance:</strong> ${endingBalance.toFixed(2)}</p>
        </div>
    );
};

export default Trends;