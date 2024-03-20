import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface HabitGraphDataProps {
    chartWidth: number;
    graphData: any[];
}

const HabitGraphData: React.FC<HabitGraphDataProps> = ({ chartWidth, graphData }) => {
    return (
        <section>
            <div className="my-4">
                <h3 className="text-xl font-semibold mb-2">Progress Graph</h3>
                <div style={{ width: '100%', maxWidth: '100%' }}>
                    <LineChart
                        width={chartWidth} // Adjust margin as needed
                        height={300}
                        data={graphData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Expected" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Cumulative" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="Daily" stroke="#ffc658" />
                        <Line type="monotone" dataKey="Difference" stroke="#ff7300" />
                    </LineChart>
                </div>
            </div>
        </section>
    );
};

export default HabitGraphData;