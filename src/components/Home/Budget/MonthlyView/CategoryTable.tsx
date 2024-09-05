import React from 'react';

// Updated props definition
interface CategoryTableProps {
    categories: string[];
    allDates: string[];
    transactionMatrix: Record<string, Record<string, number>>;
    dailyDifferences: Record<string, number>;
    dailyBalances: Record<string, number>;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
    categories,
    allDates,
    transactionMatrix,
    dailyDifferences,
    dailyBalances
}) => {
    console.log('All dates for rendering:', allDates);
    console.log('Transaction matrix:', transactionMatrix);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 bg-slate-300">Category / Day</th>
                        {allDates.map((dateString, i) => {                            
                            return <th key={i} className="border p-2 bg-slate-300">{dateString}</th>;
                        })}
                        <th className="border p-2 bg-slate-300">Total</th>
                        <th className="border p-2 bg-slate-300">Category Totals</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, rowIndex) => (
                        <tr key={category} className={rowIndex % 2 === 0 ? 'bg-slate-100' : 'bg-slate-200'}>
                            <td className="border p-2 font-bold">{category}</td>
                            {allDates.map((date, i) => {
                                const amount = transactionMatrix[category][date] || 0;                                
                                const bgColor = (category === 'Misc. Income' || category === 'Work Income') && amount > 0 ? 'bg-green-100' : (amount > 0 ? 'bg-red-100' : '');
                                return (
                                    <td key={i} className={`border p-2 text-right ${bgColor}`}>
                                        {amount !== 0 ? `$${amount.toFixed(2)}` : '-'}
                                    </td>
                                );
                            })}
                            <td className="border p-2 font-bold text-right">
                                ${Object.values(transactionMatrix[category]).reduce((acc, val) => acc + val, 0).toFixed(2)}
                            </td>
                            <td className='border p-2 bg-slate-30'>{category}</td>
                        </tr>
                    ))}
                    {/* Daily Differences Row */}
                    <tr className="bg-slate-300 border-t-2 border-blue-600">
                        <td className="border p-2 font-bold">Daily Difference</td>
                        {allDates.map((date, i) => {
                            const dailyDiff = dailyDifferences[date] || 0;                            
                            const bgColor = dailyDiff > 0 ? 'bg-green-100' : (dailyDiff < 0 ? 'bg-red-100' : '');
                            return (
                                <td key={i} className={`border p-2 text-right font-bold ${bgColor}`}>
                                    ${dailyDiff.toFixed(2)}
                                </td>
                            );
                        })}
                        <td className="border p-2 font-bold text-right">                            
                        </td>
                        <td className="border p-2 font-bold text-right">                            
                        </td>
                    </tr>
                    {/* Running Balance Row */}
                    <tr className="bg-slate-300">
                        <td className="border p-2 font-bold">Running Balance</td>
                        {allDates.map((date, i) => {
                            const balance = dailyBalances[date];                            
                            return (
                                <td key={i} className="border p-2 text-right font-bold">
                                    ${balance.toFixed(2)}
                                </td>
                            );
                        })}
                        <td className="border p-2 font-bold text-right">                            
                        </td>
                        <td className="border p-2 font-bold text-right">                            
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;