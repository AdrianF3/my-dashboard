import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimelineView: React.FC<{ budgetDetails: Record<string, any> }> = ({ budgetDetails }) => {

    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Balance Over Time</h2>
            {budgetDetails.timelineData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={budgetDetails.timelineData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                            dataKey="date" 
                            tickFormatter={(date) => new Date(date).toLocaleDateString()} 
                        />
                        <YAxis />
                        <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                        <Legend />
                        {Object.keys(budgetDetails.detailedSummaries).map(accountID => (
                            <Line 
                                key={accountID} 
                                type="monotone" 
                                dataKey={accountID} 
                                stroke={budgetDetails.detailedSummaries[accountID].visible ? budgetDetails.detailedSummaries[accountID].color || "#8884d8" : "transparent"} 
                                activeDot={{ r: 8 }} 
                                connectNulls={true} // Ensure the line connects even if there are gaps
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>No data available for the selected accounts.</p>
            )}
        </div>
    );
};

export default TimelineView;
